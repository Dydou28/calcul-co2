const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.query.access_token;
  let id = req.params.id

  if (!token) {
    token = req.headers["x-access-token"];
  }
  if (!token) {
    res.status(422).json({
      status: false,
      message: "No token"
    });
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(422).json({
          status: false,
          message: err.message
        });
      } else if (decoded !== undefined && decoded['id'] === id) {
        User.findOne({ _id: id }).exec(async (err, user) => {
            if (err) {
              res.status(422).json({
                  status: false,
                  message: err,
              });
            } else if (!user) {
              res.status(422).json({
                  status: false,
                  message: "Wrong id",
              });
            // } else if (user.emailVerified != true) {
            //   res.status(422).json({
            //       status: false,
            //       accessToken: null,
            //       refreshToken: null,
            //       message: "Your email was not verified",
            //   });
            } else {
              next();
            }
        });
      } else
        res.status(422).json({
          status: false,
          message: "wrong token"
        })
    });
  }
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;