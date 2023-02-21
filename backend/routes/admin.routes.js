const controller = require("../controllers/admin.controller");
const authJwt = require("../middlewares/authJWT");
const roles = require("../middlewares/roles");
const logs = require("../middlewares/logs");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/user/:id/admin", [authJwt.verifyToken], [roles.isAdmin], controller.isAdmin, logs);
    app.get("/user/:id/users/roles", [authJwt.verifyToken], [roles.isSuperAdmin], controller.usersListWithRole, logs);
};