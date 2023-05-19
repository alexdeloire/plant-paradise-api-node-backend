const { authJwt } = require("../middlewares");
const familyController = require("../controllers/family.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Create a new Family
  router.post("/", [authJwt.verifyToken, authJwt.isModerator], familyController.createFamily);

  // Retrieve all Families
  router.get("/", [authJwt.verifyToken], familyController.getAllFamilies);

  // Retrieve a single Family with id
  router.get("/:id", [authJwt.verifyToken], familyController.getFamilyById);

  // Update a Family with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isModerator], familyController.updateFamilyById);

  // Delete a Family with id
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    familyController.deleteFamilyById
  );

  app.use("/api/families", router);
};
