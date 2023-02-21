const role = require("../middlewares/role");
const db = require("../models");
const User = db.user;
const RoleMapping = db.roleMapping;
const Role = db.role;

exports.isAdmin = async (req, res, next) => {
    res.message = "check if admin";
    res.status(201).json({
        status: true,
    });
    next();
}

getRoles = async function (id) {
    return new Promise(resultat => RoleMapping.find({ userId: id }).exec((err, roles) => {
        if (roles) {
            resultat(roles);
        } else resultat(null);
    }))
};

exports.usersListWithRole = async (req, res, next) => {
    const userId = req.params.id;

    User.find({ _id: { "$ne": userId } }, async function (err, users) {
        if (err) {
            console.log(err)
            res.status(422).json({
                status: false,
                message: err
            })
        } else if (users) {
            usersRoles = await Promise.all(
                users.map(async function (user) {
                    const roles = await getRoles(user._id);
                    return { _id: user._id, name: user.last_name + ' ' + user.first_name, email: user.email, roles: roles};
                })
            )
            res.message = 'send all users';
            res.status(200).json({
                status: true,
                users: usersRoles
            });
            next();
        }
    })
}