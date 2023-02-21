const { authJwt } = require("../middlewares");
const controller = require("../controllers/contact.controller");
const logs = require("../middlewares/logs");

module.exports = function (app) {
    app.use(function (req, res, next) {
        
        res.header(

            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    
    app.post("/user/:id/contact", [authJwt.verifyToken], controller.createContact, logs);
    }