const Groupe = require('../models/groupe.model');
const User = require('../models/users.model');


exports.readGroupe = (req, res, next) => {
    Groupe.find({}).exec(async (err, groupes) => {
        if (err) {
            res.message = "mongoDB error";
            res.status(400).json({
                status: false,
                message: "Error Database",
                groupes: null
            });
        } else if (!groupes) {
            res.status(201).json({
                status: false,
                message: 'No Groupes',
                groupes: null
            });
            res.message = 'No Groupes';
            next();
        } else {
            res.status(200).json({
                status: true,
                message: 'All groupes',
                groupes
            });
            res.message = 'All groupes';
        }
    })
}


exports.currentGroupe = (req, res, next) => {

    Groupe.findOne({"users":req.params.id}, null, function (error, groupe) {
        if(error){
            res.status(400).json({
                status: false,
                message: "Current groupe error",
            });
    }else if (!groupe) {
        res.status(201).json({
            status: false,
            message: 'No Groupe',
            groupe: null
        });
        next();
    }
    else{
        res.status(200).json({
            status: true,
            message: "Current groupe",
            groupe
        });
    }

    });
    // Groupe.find({}).exec(async (err, groupes) => {
    //     if (err) {
    //         res.message = "mongoDB error";
    //         res.status(400).json({
    //             status: false,
    //             message: "Error Database",
    //             groupes: null
    //         });
    //     } else if (!groupes) {
    //         res.status(201).json({
    //             status: false,
    //             message: 'No Groupes',
    //             groupes: null
    //         });
    //         res.message = 'No Groupes';
    //         next();
    //     } else {
    //         res.status(200).json({
    //             status: true,
    //             message: 'All groupes',
    //             groupes
    //         });
    //         res.message = 'All groupes';
    //     }
    // })
}


exports.creatGroupe = async (req, res, next) => {
    const user = await User.findById({ _id: req.params.id });

    const isGroupeExist = await Groupe.findOne({ name: req.body.name });


    if (isGroupeExist) {        
        res.status(400).json({
            status: false,
            message: "Groupe name already exists, try new one!",
        });
    } else {
        const groupe = new Groupe({
            users: [{
                authReq: user.authReq,
                _id: user._id,
                username: user.username,
                email: user.email,
                last_name: user.last_name,
                first_name: user.first_name,
                password: user.password,
                updateAt: user.updateAt,
                emailVerified: user.emailVerified,
                __v: user.__v

            }],
            name: req.body.name,
            creationDate: Date.now(),
        });
        groupe.save()
            .then(() => res.status(201).json({ groupe }))
            .catch(error => { res.status(400).json({ error }), console.log(error); });
    }
};

exports.exitGroupe = async (req, res, next) => {
    const user = await User.findById({ _id: req.params.id });
    Groupe.updateMany({},
        {
            $pullAll:
            {
                users: [{ _id: user._id }]
            }
        },
        { safe: true, multi: true },
        function (err, obj) {
            if (err) {
                res.message = "Groupe exit error";
                res.status(400).json({
                    status: false,
                    message: "Groupe exit error",
                });
            } else {
                res.status(200).json({
                    status: true,
                    message: "Groupe exited",
                });
            }
        }
    );
}
exports.joinGroupe = async (req, res, next) => {

    const user = await User.findById({ _id: req.params.id });
    Groupe.findOneAndUpdate({ _id: req.params.groupeId },
        {
            $push: {
                users: [{
                    authReq: user.authReq,
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    last_name: user.last_name,
                    first_name: user.first_name,
                    password: user.password,
                    updateAt: user.updateAt,
                    emailVerified: user.emailVerified,
                    __v: user.__v
                }]
            },
        },
        { new: true },
        (err, result) => {
            if (err) {
                res.message = "Groupe update error";
                res.status(400).json({
                    status: false,
                    message: "Groupe update error",
                });
            }
            else {
                res.message = 'Groupe was updated';
                res.status(200).json({
                    status: true,
                    result
                });

            }
        }
    )
}