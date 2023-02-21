const controller = require("../controllers/groupe.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/user/:id/groupe", controller.readGroupe);
    app.get("/user/:id/groupe/currentGroupe", controller.currentGroupe);
    app.post("/user/:id/groupe", controller.creatGroupe);
    //app.delete("/user/:id/resolution", controller.deleteResolution);
    app.patch("/user/:id/groupe/:groupeId/joinGroupe", controller.joinGroupe);
    app.patch("/user/:id/groupe/exitGroupe", controller.exitGroupe);
    

}