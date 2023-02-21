const controller = require("../controllers/indiceSource.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/user/:id/sources", controller.getAllIndice);
    app.post("/user/:id/sources", controller.creatIndice);
    app.post("/user/:id/sources/file/excel", controller.importIndiceFile);
}