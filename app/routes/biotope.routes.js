const { authJwt } = require("../middlewares");
const biotopeController = require("../controllers/biotope.controller");

module.exports = function (app) {

  var router = require("express").Router();

  // Create a new Biotope
  router.post("/", [authJwt.verifyToken, authJwt.isModerator], biotopeController.createBiotope);


  // Retrieve all Biotopes
  router.get("/", [authJwt.verifyToken], biotopeController.getAllBiotopes);

  // Retrieve a single Biotope with id
  router.get("/:id", [authJwt.verifyToken], biotopeController.getBiotopeById);

  // Update a Biotope with id
  router.put("/:id", [authJwt.verifyToken, authJwt.isModerator], biotopeController.updateBiotopeById);

  // Delete a Biotope with id
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    biotopeController.deleteBiotopeById
  );

  app.use("/api/biotopes", router);
};
