const mongoose = require('mongoose');

const Value = mongoose.Schema({
  year: {type: Number, required: false },
  value: {type: Number, required: false },
})

const Indice = mongoose.Schema({
  label : {type: String, required: false },
  value: [Value],
})

const CalculetteEntityModel = mongoose.model(
  "CalculetteEntityModel",
  new mongoose.Schema({
    label: {type: String, required: true },
    indice: [Indice],
  })
)
module.exports = CalculetteEntityModel;

