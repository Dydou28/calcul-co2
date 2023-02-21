const controller = require("../controllers/resolution.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/user/:id/resolution", controller.readResolution);
    app.post("/user/:id/resolution", controller.creatResolution);
    app.delete("/user/:id/resolution", controller.deleteResolution);
    app.patch("/user/:id/resolution/valideResolution", controller.valideResolution);
    

}