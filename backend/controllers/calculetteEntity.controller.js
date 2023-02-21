const CalculetteEntityModel = require('../models/calculetteEntity.model');

exports.getAllAgence = (req, res, next) => { 
    CalculetteEntityModel.find({}).exec(async (err, calculetteEntityModel) => {
      if (err) {
          res.message = "mongoDB error";
          res.status(400).json({
              status: false,
              message: "Error Database",
              calculetteEntityModel: null
          });
      } else if (!calculetteEntityModel) {
        res.status(201).json({
            status: false,
            message: 'No egence',
            calculetteEntityModel: null
        });
        res.message = 'No agence';
        next();
      } else {
        res.status(200).json({
            status: true,
            message: 'All agences',
            calculetteEntityModel
        });
        res.message = 'All agence';
      }
    })
  }

  exports.creatAgence = (req, res, next) => { 
    delete req.body._id;
    const product = new CalculetteEntityModel({
      ...req.body
    });
    product.save()
      .then(() => res.status(201).json({ product }))
      .catch(error => res.status(400).json({ error })); 
  };