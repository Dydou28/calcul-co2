const db = require("../models");
const RoleMapping = db.roleMapping;
const Role = db.role;

isAdmin = async function (req, res, next) {
    let id = req.params.id
    const AdminRole_id = await this.getAdminRole_id();
    const superAdminRole_id = await this.getSuperAdminRole_id();
    RoleMapping.findOne({ userId: id, $or: [{roleId: AdminRole_id}, {roleId: superAdminRole_id}]  }).exec((err, exists) => {
        if (exists) {
            next();
        }
        else {
            res.status(200).json({
                status: false,
                message: "unauthorized !"
            });
        }
    })
}

isSuperAdmin = async function (req, res, next) {
    let id = req.params.id
    const AdminRole_id = await this.getSuperAdminRole_id();
    RoleMapping.findOne({ userId: id, roleId: AdminRole_id }).exec((err, exists) => {
        if (exists) {
            next();
        }
        else {
            res.status(200).json({
                status: false,
                message: "unauthorized !"
            });
        }
    })
}

getSuperAdminRole_id = async function () {
    return new Promise(results => {
        Role.findOne({ name: "SUPER_ADMIN" }).exec((err, exists) => {
            if (exists) results(exists._id);
            else {
                console.log(err)
                throw TypeError("Admin role not defined");
            }
        })
    })
}

getAdminRole_id = async function () {
    return new Promise(results => {
        Role.findOne({ name: "ADMIN" }).exec((err, exists) => {
            if (exists) results(exists._id);
            else {
                console.log(err)
                throw TypeError("Admin role not defined");
            }
        })
    })
}

const roles = {
    isSuperAdmin,
    isAdmin
};

module.exports = roles;