const { authJwt } = require("../middlewares");
const controller = require("../controllers/balanceIndividual.controller");
const logs = require("../middlewares/logs");

module.exports = function (app) {
    app.use(function (req, res, next) {
        
        res.header(

            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/user/:id/balance/individual", [authJwt.verifyToken], controller.getAllBalance, logs);
    app.get("/user/:id/balance/individual/last", controller.getLastBalance);
    app.post("/user/:id/balance/individual", [authJwt.verifyToken], controller.newBalance, logs);
    app.post("/user/:id/balance/individual/restart", [authJwt.verifyToken], controller.restartBalance, logs);

    app.get("/user/:id/balance/:balanceId/individual", [authJwt.verifyToken], controller.getBalance, logs);

    app.get("/user/:id/balance/individual/step/:stepName", [authJwt.verifyToken], controller.getStepBalance, logs);
    app.put("/user/:id/balance/:balanceId/individual/step/:stepName", [authJwt.verifyToken], controller.updateStepBalance, logs);
    app.delete("/user/:id/balance/:balanceId/individual/step/:stepName/:questionId", [authJwt.verifyToken], controller.deleteRow, logs);
}