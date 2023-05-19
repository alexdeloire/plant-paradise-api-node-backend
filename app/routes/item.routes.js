const { authJwt } = require("../middlewares");
const items = require("../controllers/item.controller.js");



module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
  var router = require("express").Router();

  // Create a new Item
  router.post("/",[authJwt.verifyToken], items.create);

  // Retrieve all Items
  router.get("/",[authJwt.verifyToken], items.findAll);

  // Retrieve all published Items
  router.get("/published",[authJwt.verifyToken], items.findAllPublished);

  // Retrieve all unpublished Items
  router.get("/unpublished",[authJwt.verifyToken], items.findAllUnpublished);

  // Retrieve a single Item with id
  router.get("/:id",[authJwt.verifyToken], items.findOne);

  // Update a Item with id
  router.put("/:id",[authJwt.verifyToken], items.update);

  // Delete a Item with id
  router.delete("/:id",[authJwt.verifyToken, authJwt.isModerator], items.delete);

  // Delete all Items
  router.delete("/",[authJwt.verifyToken, authJwt.isAdmin], items.deleteAll);

  app.use("/api/items", router);
};
