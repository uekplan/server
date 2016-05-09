"use strict";

var express = require('express');
var router = express.Router();
var Label = require('uekplan-models').label;
var models = require('uekplan-models');
var Event = require('uekplan-models').event;
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

router.get('/activities', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'A'}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});


router.get('/types', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'T'}
    })
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});

router.get('/notes', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'timetableId', 'key', 'value', 'type', 'moodleId', 'parentId'],
        where: {type: 'I'}
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

/**
 *
 */
router.get('/timetables/:timetables', (req, res, next)=> {

    Label.findAll({where: {id: req.params.timetables.split(',')}}).then((data)=> {
        Event.findAll({
            include: [{
                model: models.label,
                as: 'tutor'

            }, {
                model: models.label,
                as: 'group'

            }, {
                model: models.label,
                as: 'place'

            }, {
                model: models.label,
                as: 'activity'

            }, {
                model: models.label,
                as: 'note'

            }, {
                model: models.label,
                as: 'type'

            }],
            where: {
                $or: {
                    tutorId: {$or: req.params.timetables.split(',')},
                    groupId: {$or: req.params.timetables.split(',')},
                    placeId: {$or: req.params.timetables.split(',')}
                }
            }
        }).then((data)=> {
            res.json(data);
        })
    });
});

/**
 *
 */
router.get('/timetables/:timetables/tutors', (req, res, next)=> {

    Event.findAll({

        include: [{
            model: models.label,
            as: 'tutor'

        }],
        where: {
            $or: {
                tutorId: {$or: req.params.timetables.split(',')},
                groupId: {$or: req.params.timetables.split(',')},
                placeId: {$or: req.params.timetables.split(',')}
            }
        }
    }).then((data)=> {

        var ob = {};
        data.forEach((event)=> {
            if (event.tutor) {

                ob[event.tutor.id] = event.tutor;
            }
        });
        var list = [];
        for (var e in ob) {
            list.push(ob[e]);
        }
        res.json(list);
    });
});

/**
 *
 */
router.get('/timetables/:timetables/groups', (req, res, next)=> {

    Event.findAll({

        include: [{
            model: models.label,
            as: 'group'

        }],
        where: {
            $or: {
                tutorId: {$or: req.params.timetables.split(',')},
                groupId: {$or: req.params.timetables.split(',')},
                placeId: {$or: req.params.timetables.split(',')}
            }
        }
    }).then((data)=> {

        var ob = {};
        data.forEach((event)=> {
            if (event.group) {

                ob[event.group.id] = event.group;
            }
        });
        var list = [];
        for (var e in ob) {
            list.push(ob[e]);
        }
        res.json(list);
    });
});

/**
 *
 */
router.get('/timetables/:timetables/places', (req, res, next)=> {

    Event.findAll({

        include: [{
            model: models.label,
            as: 'place'
        }],
        where: {
            $or: {
                tutorId: {$or: req.params.timetables.split(',')},
                groupId: {$or: req.params.timetables.split(',')},
                placeId: {$or: req.params.timetables.split(',')}
            }
        }
    }).then((data)=> {

        var ob = {};
        data.forEach((event)=> {
            if (event.place) {
                ob[event.place.id] = event.place;
            }
        });
        var list = [];
        for (var e in ob) {
            list.push(ob[e]);
        }
        res.json(list);
    }).catch((err)=> {
        console.log(err);
        res.sendStatus(500);
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


module.exports = router;
