const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/user/register", controller.signup);
    app.post("/user/authenticate", controller.signin);
    app.post("/user/refreshtoken", controller.refreshToken);
    app.get("/user/verifyEmail/:email/:rand", controller.verifyEmail);
    app.post("/user/verifyEmail", controller.sendVerifEmail);
}