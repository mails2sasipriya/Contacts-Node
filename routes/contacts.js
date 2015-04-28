var router = require('express').Router();
var ContactModel = require('../models/contacts_model');

router.get('/:id', function (req, res) {
    ContactModel.find({'email' : req.params.id}, function (err, result) {
        if(err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

router.get('/', function (req, res) {
    ContactModel.find({}, function (err, result) {
        if(err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

router.post('/', function (req, res) {
    (new ContactModel(req.body)).save(function (err, result) {
        if(err) res.status(500).json(err);
        else res.status(200).json(result);
    });
});

router.put('/:id', function (req, res) {
    ContactModel.update({'email' : req.params.id}, { $set: {'name' : req.body.name} }, function (err, result) {
        if(err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

router.delete('/:id', function (req, res) {
    ContactModel.remove({'email' : req.params.id}, function (err, result) {
        if (err) res.status(500).json(err);
        else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
