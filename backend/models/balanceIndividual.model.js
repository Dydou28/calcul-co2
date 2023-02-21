const mongoose = require('mongoose');

const step = mongoose.Schema({
    label: {type: String, required: true },
    questions: [{
        label: {type: String, required: true },
        resp: {type: String, required: false },
        totalCarbon: {type: Number, default: 0 },
    }] ,
    totalCarbon: {type: Number, default: 0 },
    terminated: { type: Boolean, default: false },
}) 

const carbonBalanceIndividual = mongoose.Schema({
    userId:  {type: String, required: true },
    steps:  [step],
    totalBalance: {type: Number, default: 0 },
    proOrNot: { type: Boolean, default: false },
    terminated: { type: Boolean, default: false },
    creationDate: {type: Date, required: true },
    updateAt:{type: String, required: false},
})

module.exports = mongoose.model('carbonBalanceIndividual', carbonBalanceIndividual);
