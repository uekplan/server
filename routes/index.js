"use strict";

var express = require('express');
var router = express.Router();
var Label = require('uekplan-models').label;
var Exception = require('uekplan-models').exception;

router.get('/', function (req, res, next) {
    res.render('index', {title: 'uekplan'});
});

router.get('/all', function (req, res, next) {

    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: {$ne: '?'}}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});

router.get('/tutors', function (req, res, next) {

    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'N'}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});
router.get('/rooms', function (req, res, next) {

    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'S'}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});
router.get('/groups', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'G'}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});


router.get('/buildings', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'B'}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});
router.get('/fields', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'F'}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});

router.get('/exceptions', function (req, res, next) {
    Exception.findAll({
        attributes: ['id', 'key', 'type'],
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});
router.delete('exception/:id', (req, res, next)=> {
    Exception.destroy({
        where: {
            id: req.params.id
        }
    }).then(()=> {
        res.status(204).send();
    }).catch((err)=> {
        res.status(500).send();
    });
});

router.delete('label/:id', (req, res, next)=> {
    Label   .destroy({
        where: {
            id: req.params.id
        }
    }).then(()=> {
        res.status(204).send();
    }).catch((err)=> {
        res.status(500).send();
    });
});


module.exports = router;
