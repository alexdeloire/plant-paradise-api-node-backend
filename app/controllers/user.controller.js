const db = require("../models");
const User = db.user;
const Role = db.role;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Welcome Moderator! Your job is to verify these posts.");
};

// get all users
exports.findAll = (req, res) => {
  const { page, size, username } = req.query;
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  User.paginate(condition, { offset, limit, populate: "roles", select: "-password -__v" })
    .then((data) => {
      const users = data.docs.map((user) => ({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.map((role) => role.name),
      }));
      res.send({
        totalItems: data.totalDocs,
        users: users,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users.",
      });
    });
}

// update user roles
exports.updateRoles = (req, res) => {
  User.findOne({ username: req.params.username })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      // we are going to update the roles array of the user
      // we need to find the ids in Roles collection that correspond to the roles we receive in the request body
      // we are going to use the find method of the Role model
      // we are going to use the $in operator to find all roles in the request body.roles array
      // we are going to use the _id field to find the roles
      // we are going to use the map method to create an array of ids
      Role.find({
        name: { $in: req.body.roles }
      })
        .then(roles => {
          user.roles = roles.map(role => role._id);
          // we are going to save the user
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            // we are going to send a response to the client
            res.send({ message: "User was updated successfully." });
          });
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}



