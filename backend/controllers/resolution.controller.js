const Resolution = require('../models/resolution.model');


exports.readResolution = async (req, res, next) => {
    const userId = req.params.id;

    Resolution.find({ userId: req.params.id }, async function (err, resolutions) {
        if (err) {
            console.log(err)
            res.status(422).json({
                status: false,
                message: err
            })
        } else if (!resolutions) {
            res.status(201).json({
                status: false,
                message: 'No resolutions',
                resolutions: null
            });
            res.message = 'No resolutions';
            next();
        } else {
            res.status(200).json({
                status: true,
                message: 'All resolutions',
                resolutions
            });
            res.message = 'All resolutions';
        }
    })
}



exports.creatResolution = (req, res, next) => {
    const resolution = new Resolution({
        userId: req.params.id,
        label: req.body.label,
        creationDate: Date.now(),
        state: req.body.state,
    });
    resolution.save()
        .then(() => res.status(201).json({ resolution }))
        .catch(error => { res.status(400).json({ error }), console.log(error); });

};

exports.deleteResolution = async (req, res, next) => {
    Resolution.findOneAndDelete(({ _id: req.params.id }), function (err, docs) {
        if (err) {
            res.message = "resolution doesn't exist";
            res.status(400).json({
                status: false,
                message: "resolution doesn't exist",
            });
        }
        else {
            res.message = 'resolution was deleted';
            res.status(200).json({
                status: true,
                message: "resolution was deleted",
            });

        }
    });

};

exports.valideResolution = async (req, res, next) => {

    Resolution.findOneAndUpdate({ _id: req.params.id },
        { $set: req.body },
        { new: true },
        (err, result) => {
            if (err) {
                res.message = "Resolution update error";
                res.status(400).json({
                    status: false,
                    message: "Resolution update error",
                });
            }
            else {
                res.message = 'Resolution was updated';
                res.status(200).json({
                    status: true,
                    result
                });

            }
        }
    )
};



