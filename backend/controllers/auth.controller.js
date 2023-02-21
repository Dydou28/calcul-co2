const config = require("../config/auth");
const server = require("../config/server");
const db = require("../models");
const User = db.user;
const RefreshToken = db.refreshToken;
const EmailToken = db.emailToken;
const utilsUser = require("../middlewares/utils.user");

const ceo = require("../middlewares/ceo");
const mailTemplate = require("../middlewares/mailTemplate");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function newVerifyEmailSend(email, id) {
    EmailToken.deleteMany({ userId: id}).exec();
    let emailToken = await EmailToken.createToken(id);

    let content = mailTemplate.msgTemplate1 + `Vérification de l'adresse mail` + mailTemplate.msgTemplate2 + 'Cliquez sur ce lien pour valider votre adresse mail '
        + '<a href="' + server.frontUrl + '/verify_email/' + email + '/' + emailToken + '" target="_blank"> Lien</a>' + mailTemplate.msgTemplate3;

    ceo.sendMails([email], content, `Vérification de l'adresse mail`, 'Calculette C02');
}

exports.signup = async (req, res, next) => {
    const { username, email, last_name, first_name, password } = req.body;
    var testEmail, testUsername = null;

    if (password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*.#?&]{8,}$/)) {
        if (!(testUsername = await utilsUser.checkDuplicUsername(username))
            && !(testEmail = await utilsUser.checkDuplicEmail(email))) {

            const user = new User({
                username: username,
                email: email,
                last_name: last_name,
                first_name: first_name,
                password: bcrypt.hashSync(password, 8),
                updateAt: Date.now()
            });

            user.save(async (err, user) => {
                if (err) {
                    res.status(422).json({
                        status: false,
                        message: err,
                    });
                } else {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: config.jwtExpiration,
                    });
                    var refreshToken = await RefreshToken.createToken(user._id);

                    //newVerifyEmailSend(email, user._id);

                    res.status(200).json({
                        username: username,
                        email: email,
                        last_name: last_name,
                        first_name: first_name,
                        accessToken: token,
                        refreshToken: refreshToken
                    });
                }
            });
        } else {
            let errMessage1 = testUsername ? 'username ' : '';
            let errMessage2 = testEmail ? 'email ' : '';
            let errMessage = errMessage1 + errMessage2 + 'already used';
            res.status(422).json({
                status: false,
                message: errMessage,
            });
        }
    } else {
        res.status(422).json({
            status: false,
            message: 'Wrong password format',
        });
    }
};

exports.verifyEmail = async (req, res, next) => {
    const email = req.params.email;
    const rand = req.params.rand;

    User.findOne({ email: email }).exec(async (err, user) => {
        if (err) {
            res.status(422).json({
                status: false,
                message: 'Error MongoDB verify email'
            });
        } else if (!user) {
            res.status(201).json({
                status: false,
                message: 'User doesn\'t exist'
            });
        } else {
            EmailToken.updateOne({ userId: user._id }, { $inc: { nbRequest: 1 } }).exec();
            EmailToken.findOne({userId: user._id}).exec(async (err, emailToken) => {
                if (err) {
                    res.status(422).json({
                        status: false,
                        message: 'Error MongoDB verify email'
                    });
                } else if (!emailToken) {
                    res.status(201).json({
                        status: false,
                        message: 'Email token doesn\'t exist'
                    });
                } else {
                    if (emailToken.nbRequest < 5) {
                        if (emailToken.token === rand) {
                            if (EmailToken.verifyExpiration(emailToken)) {
                                newVerifyEmailSend(email, user._id);
                                res.message = 'link expired, a new mail was send with a new link';
                                res.status(422).json({
                                    status: false,
                                    message: "link expired, a new mail was send with a new link"
                                })
                            } else {
                                EmailToken.deleteMany({ userId: user._id}).exec();
                                User.updateOne({ _id: user._id }, {
                                    $set: {
                                        emailVerified: true,
                                    }
                                }).exec((err, user) => {
                                    if (err) {
                                      console.log(err)
                                        res.message = "mongoDB error";
                                        res.status(400).json({
                                            status: false,
                                            message: "Error Database",
                                        });
                                    } else {
                                      res.status(200).json({
                                          status: true,
                                          message: 'Email has been verified',
                                      });
                                      res.message = 'Email has been verified';
                                      next();
                                    }
                                })
                            }
                        } else {
                            res.message = 'wrong token';
                            res.status(422).json({
                                status: false,
                                message: "wrong token"
                            })
                        }
                    } else {
                        newVerifyEmailSend(email, user._id);
                        res.message = 'wrong number of request, a new mail was send with a new link';
                        res.status(422).json({
                            status: false,
                            message: "wrong number of request, a new mail was send with a new link"
                        })
                    }
                }
            })
        }
    })
}

exports.signin = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    console.log("this is test");
    User.findOne({ $or: [{ username: username}, {email: email }] }).exec(async (err, user) => {
        if (err) {
            res.status(422).json({
                status: false,
                message: err,
            });
        } else if (!user) {
            res.status(200).json({
                status: false,
                message: "User Not found.",
            });
        } else {
            if (user.authReq.nb > 5 && user.authReq.update + 600000 > parseInt(Date.now())) {
                res.status(422).json({
                    status: false,
                    accessToken: null,
                    refreshToken: null,
                    message: "Too Many Attempts try it 10mn later",
                });
            } else {
                if (user.authReq.update + 600000 < Date.now()) {
                    User.updateOne({ _id: user._id }, { $set: { "authReq.nb": 0 } }).exec();
                }
                User.updateOne({ _id: user._id }, 
                    {
                        $inc: { "authReq.nb": 1 },
                        $set: { "authReq.update": Date.now() } 
                    }).exec();
                var passwordIsValid = bcrypt.compareSync(password, user.password);

                if (!passwordIsValid) {
                    res.status(200).json({
                        status: false,
                        accessToken: null,
                        refreshToken: null,
                        message: "Invalid Password!",
                    });
                // } else if (user.emailVerified != true) {
                //     res.status(200).json({
                //         status: false,
                //         accessToken: null,
                //         refreshToken: null,
                //         message: "Your email was not verified",
                //     });
                } else {
                    User.updateOne({ _id: user._id }, { $set: { "authReq.nb": 0 } }).exec();
                    var token = jwt.sign({ id: user._id }, config.secret, {
                        expiresIn: config.jwtExpiration,
                    });
                    var refreshToken = await RefreshToken.createToken(user._id);

                    utilsUser.updateUser(user._id, { updateAt: Date.now(), notifDel: false });

                    res.status(200).json({
                        status: true,
                        username: user.username,
                        email: user.email,
                        last_name: user.last_name,
                        first_name: user.first_name,
                        accessToken: token,
                        userId: user._id,
                        refreshToken: refreshToken
                    });
                }
            }
        }
    });
};

exports.refreshToken = async (req, res, next) => {
    const requestToken = req.body.refreshToken;

    if (requestToken == null) {
        return res.status(403).json({ message: "Refresh Token is required!" });
    }

    try {
        let refreshToken = await RefreshToken.findOne({ token: requestToken });

        if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
        }

        if (RefreshToken.verifyExpiration(refreshToken)) {
            RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();

            res.status(403).json({
                message: "Refresh token was expired. Please make a new signin request",
            });
            return;
        }

        let newAccessToken = jwt.sign({ id: refreshToken.user.id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: refreshToken.token,
        });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
};

exports.sendVerifEmail = (req, res, next) => {
    const email = req.body.email;
    
    User.findOne({ email: email }).exec(async (err, user) => {
        if (err) {
            res.status(422).json({
                status: false,
                message: err,
            });
        } else if (!user) {
            res.status(422).json({
                status: false,
                message: "User Not found.",
            });
        } else {
            newVerifyEmailSend(email, user._id);
            
            res.status(200).json({
                status: true,
                message: 'A verification email was send'
            });
        }
    });
};
