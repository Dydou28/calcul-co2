const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const logs = require("../middlewares/logs");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.put("/user/:id/password", [authJwt.verifyToken], controller.changePassword, logs);
    app.put("/user/password", controller.sendResetPasswordToken);
    app.patch("/user/password", controller.resetPassword);

    app.get("/user/:id/token", [authJwt.verifyToken], controller.checkToken, logs);
    app.get("/user/:id", [authJwt.verifyToken], controller.getUser, logs);
    app.patch("/user/:id", [authJwt.verifyToken], controller.userUpdate, logs);
    app.delete("/user/:id", [authJwt.verifyToken], controller.deleteUser, logs);
};