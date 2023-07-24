const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {

  app.get("/api/user/all", controller.allAccess);

  app.get("/api/user/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/user/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/user/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/user/users",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.findAll);

  app.put("/api/user/users/:username",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateRoles);
};
