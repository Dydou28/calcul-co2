const db = require("./models");
const User = db.user;
const RoleMapping = db.roleMapping;
const Role = db.role;

exports.init = async () => {
    const cryptedpassword = "$2a$08$8Gbp.kNhiGuUzdgkihTwJ.r4nsbH3c7Ds86DIAFybqLfuwOrcbof.";//cdf5b3eee63d478c&
    const admin = {
        username:"admin",
        email:"calculetteCO2@orange.com",
        password:cryptedpassword,
        first_name: "admin",
        last_name: "admin",
        emailVerified: true,
    }
    
    const admin_id = await createAdmin(admin);
    const adminRole_id = await createAdminRole();
    const superAdminRole_id = await createSuperAdminRole();
    
    if(admin_id && adminRole_id && superAdminRole_id){
        RoleMapping.findOne({userId: admin_id, roleId: adminRole_id}).exec((err, exists) =>{
            if(!exists) {
                RoleMapping.insertMany({userId: admin_id, roleId: adminRole_id, role: "ADMIN"});
                console.log("admin autorisations created");
            }
        });
        RoleMapping.findOne({userId: admin_id, roleId: superAdminRole_id}).exec((err, exists) =>{
            if(!exists) {
                RoleMapping.insertMany({userId: admin_id, roleId: superAdminRole_id, role: "SUPER_ADMIN"});
                console.log("super admin autorisations created");
            }
        });
    }
    else{
        console.log("error init database")
    }
    
}

async function createAdmin(admin) { 
    return new Promise(results =>{
        User.findOne({username: admin.username}).exec(async (err,exists) =>{
            if(exists) {
                results(exists._id);
                console.log("admin exists")
            }
            else {
                let user = await User.insertMany(admin);
                results(user[0]._id);
            }
        })
    
    })
}

async function createAdminRole() {
    return new Promise(results =>{
        Role.findOne({name: "ADMIN"}).exec(async (err, exists) =>{
            if(exists) results(exists._id);
            else {
                let role = await Role.insertMany({name: "ADMIN",});
                console.log("ADMIN role created");
                results(role[0]._id);
            }
        })
    })
}

async function createSuperAdminRole() {
    return new Promise(results =>{
        Role.findOne({name: "SUPER_ADMIN"}).exec(async (err, exists) =>{
            if(exists) results(exists._id);
            else {
                let role = await Role.insertMany({name: "SUPER_ADMIN",});
                console.log("SUPER_ADMIN role created");
                results(role[0]._id);
            }
        })
    })
}