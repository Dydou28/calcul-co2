const Indices = require('../models/indiceSource.model');

exports.getAllIndice = (req, res, next) => { 
    Indices.find({}).exec(async (err, indices) => {
      if (err) {
          res.message = "mongoDB error";
          res.status(400).json({
              status: false,
              message: "Error Database",
              indices: null
          });
      } else if (!indices) {
        res.status(201).json({
            status: false,
            message: 'No Indices',
            indices: null
        });
        res.message = 'No Indices';
        next();
      } else {
        res.status(200).json({
            status: true,
            message: 'All indices',
            indices
        });
        res.message = 'All indices';
      }
    })
  }

exports.creatIndice = (req, res, next) => { 
  delete req.body._id;
  const product = new Indices({
    ...req.body
  });
  product.save()
    .then(() => res.status(201).json({ product }))
    .catch(error => res.status(400).json({ error })); 
};

exports.importIndiceFile = async (req, res, next) => { 
  await Indices.deleteMany({}).exec();

  console.log(req.body.indices)
  Indices.insertMany(req.body.indices);
  res.message = "Sources file imported";
  res.status(200).json({
      status: true,
      message: "Sources file imported",
  });
};

