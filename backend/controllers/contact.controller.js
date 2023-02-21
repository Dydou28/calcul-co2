const Contact = require('../models/contact.model');

exports.createContact = (req, res, next) => {
    const contact = new Contact({
        userId: req.params.id,
        rate: req.body.rate,
        questionLong: req.body.questionLong,
        questionRajouter: req.body.questionRajouter,
        idee: req.body.idee,
        creationDate: Date.now(),        
    });
    contact.save()
        .then(() => {res.status(201).json({ contact })})
        .catch(error => { res.status(400).json({ error }), console.log(error); });

};





