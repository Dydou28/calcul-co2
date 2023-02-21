const config = require("../config/auth");
const db = require("../models");
const User = db.user;
const PassToken = db.passToken;
const utilsUser = require("../middlewares/utils.user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ceo = require("../middlewares/ceo");
const mailTemplate = require("../middlewares/mailTemplate");

exports.checkToken = (req, res) => {
    res.message = 'good token';
    res.status(200).json({
        status: true,
        message: 'good token'
    })
}

exports.deleteUser = async (req, res, next) => {
    const user = await utilsUser.getUser({ _id: req.params.id });

    if (user) {
        User.deleteOne({ _id: user._id }).exec();
        res.message = 'user was delete';
        res.status(200).json({
            status: true,
            message: "user was delete",
        });
        next();
    } else {
        res.message = "user doesn't exist";
        res.status(400).json({
            status: false,
            message: "user doesn't exist",
        });
        next();
    }
}

exports.getUser = async (req, res, next) => {
    const user = await utilsUser.getUser({ _id: req.params.id });
    user.password = null;
    if (user) {
        console.log(user);
        res.message = 'send user info';
        res.status(200).json(user);
        next();
    } else {
        res.message = "user doesn't exist";
        res.status(400).json({
            status: false,
            message: "user doesn't exist",
        });
        next();
    }
};

exports.userUpdate = async (req, res, next) => {
    if (await utilsUser.updateUser(req.params.id, req.body)) {
        const user = await getUser({ _id: req.params.id });
        res.message = 'user was update';
        res.status(200).json({
            status: true,
            user
        });
        next();
    } else {
        res.message = "user update error";
        res.status(400).json({
            status: false,
            message: "user update error",
        });
        next();
    };
};

exports.changePassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    var user = await getUser({ _id: req.params.id });

    if (user) {
        var passwordIsValid = bcrypt.compareSync(oldPassword, user.password);

        if (!passwordIsValid) {
            res.message = 'Invalid Password!';
            res.status(422).json({
                status: false,
                message: "Invalid Password!",
            });
            next();
        } else {
            user.password = bcrypt.hashSync(newPassword, 8);
            const updateUser = new User(user);
            updateUser.save((err, user) => {
                if (err) {
                    res.message = 'mongodb error when password update';
                    res.status(422).json({
                        status: false,
                        message: err,
                    });
                    next();
                } else {
                    res.message = 'password was changed';
                    res.status(200).json({
                        status: true,
                        message: "your password was changed"
                    });
                    next();
                }
            })
        }
    } else {
        res.message = "user doesn't exist";
        res.status(400).json({
            status: false,
            message: "user doesn't exist",
        });
        next();
    }
}

async function newForgotPassEmailSend(id, email) {
    PassToken.deleteMany({ userId: id}).exec();

    let forgotPassToken = await PassToken.createToken(id);

    let msg = mailTemplate.msgTemplate1 + 'Changement de mot de passe' + mailTemplate.msgTemplate2 + "Bonjour,<br>" +
        "Le code pour le changement de votre mot de passe est le suivant: " + forgotPassToken + mailTemplate.msgTemplate3;

    ceo.sendMails([email], msg, 'Code de changement de mot de passe', 'Calculette CO2');
}

exports.sendResetPasswordToken = async (req, res, next) => {
    const email = req.body.email;

    var user = await utilsUser.getUser({ email: email });

    if (user) {
        newForgotPassEmailSend(user._id, email);
        res.status(200).json({
            status: true,
            message: "An email with a code was send to change your password"
        });
    } else {
        res.message = "user doesn't exist";
        res.status(400).json({
            status: false,
            message: "user doesn't exist",
        });
    }
}

exports.resetPassword = async (req, res, next) => {
    const { email, password, rand } = req.body;
    var user = await utilsUser.getUser({ email: email });

    if (user) {
        PassToken.updateOne({ userId: user._id }, { $inc: { nbRequest: 1 } }).exec();
        let forgotPassToken = await PassToken.findOne({ userId: user._id });
        if (forgotPassToken) {
            if (forgotPassToken.nbRequest < 5) {
                if (forgotPassToken.token === rand) {
                    if (PassToken.verifyExpiration(forgotPassToken)) {
                        newForgotPassEmailSend(user._id, email);
                        res.message = 'Code expired, a new mail was send with a new code';
                        res.status(422).json({
                            status: false,
                            message: "Code expired, a new mail was send with a new code"
                        })
                    } else {
                        if (password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/)) {
                            PassToken.deleteMany({ userId: user._id}).exec();
                            user.password = bcrypt.hashSync(password, 8);
                            user.rand = null;
                            const updateUser = new User(user);
                            updateUser.save((err, user) => {
                                if (err) {
                                    res.status(422).json({
                                        status: false,
                                        message: err,
                                    });
                                } else {
                                    res.status(200).json({
                                        status: true,
                                        message: "your password was changed"
                                    });
                                }
                            })
                        } else {
                            res.status(422).json({
                                status: false,
                                message: 'Wrong password format',
                            });
                        }
                    }
                } else {
                    res.message = 'wrong token';
                    res.status(422).json({
                        status: false,
                        message: "wrong token"
                    })
                }
            } else {
                newForgotPassEmailSend(user._id, email);
                res.message = 'wrong number of request, a new mail was send with a new code';
                res.status(422).json({
                    status: false,
                    message: "wrong number of request, a new mail was send with a new code"
                })
            }
        } else {
            res.message = 'no token';
            res.status(422).json({
                status: false,
                message: "no token"
            })
        }
    } else {
        res.message = "user doesn't exist";
        res.status(400).json({
            status: false,
            message: "user doesn't exist",
        });
    }
}