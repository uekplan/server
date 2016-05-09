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
/**
 * @api {get} /labels Labels list
 * @apiPermission none
 * @apiDescription Returns current labels list extracted from http://planzajec.uek.krakow.pl and custom
 * @apiName getLabels
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  labels               Labels list
 * @apiSuccess (200) {Number}    labels.id            Label id
 * @apiSuccess (200) {Number}    labels.timetableId   Label timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    labels.key           Label default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    labels.value         Label label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {String}    labels.type          Label type
 * @apiSuccess (200) {Number}    labels.moodleId      Label id to its account in https://e-uczelnia.uek.krakow.pl
 * @apiSuccess (200) {Number}    labels.parentId      Label parent id
 */
router.get('/labels', function (req, res, next) {

    Label.findAll({
        attributes: [
            'id',
            'timetableId',
            'key',
            'value',
            'type',
            'moodleId',
            'parentId'
        ],
        where: {
            type: {
                // chceck in etl if needed
                $ne: '?'
            }
        }
    })
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.status(500).send();
        })
});
/**
 * @api {get} /tutors Tutors list
 * @apiPermission none
 * @apiDescription Returns current tutors list extracted from http://planzajec.uek.krakow.pl
 * @apiName getTutors
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  tutors               Tutors list
 * @apiSuccess (200) {Number}    tutors.id            Tutor id
 * @apiSuccess (200) {Number}    tutors.timetableId   Tutor timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    tutors.key           Tutor default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    tutors.value         Tutor label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    tutors.moodleId      Tutor id to his account in https://e-uczelnia.uek.krakow.pl
 * @apiSuccess (200) {Number}    tutors.parentId      Tutor parent id
 */
router.get('/tutors', function (req, res, next) {
    Label.findAll({
        attributes: [
            'id',
            'timetableId',
            'key',
            'value',
            'moodleId',
            'parentId'
        ],
        where: {
            type: 'N'
        }
    })
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.status(500).send();
        });
});
/**
 * @api {get} /rooms Rooms list
 * @apiPermission none
 * @apiDescription Returns current rooms list extracted from http://planzajec.uek.krakow.pl
 * @apiName getRooms
 * @apiGroup Label

 * @apiSuccess (200) {Object[]}  rooms               Rooms list
 * @apiSuccess (200) {Number}    rooms.id            Room id
 * @apiSuccess (200) {Number}    rooms.timetableId   Room timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    rooms.key           Room default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    rooms.value         Room label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    rooms.parentId      Room parent id - building
 */
router.get('/rooms', function (req, res, next) {
    Label.findAll({
        attributes: [
            'id',
            'timetableId',
            'key',
            'value',
            'parentId'
        ],
        where: {
            type: 'S'
        }
    })
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.status(500).send();
        });
});
/**
 * @api {get} /groups Groups list
 * @apiPermission none
 * @apiDescription Returns current groups list extracted from http://planzajec.uek.krakow.pl
 * @apiName getGroups
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  groups               Groups list
 * @apiSuccess (200) {Number}    groups.id            Group id
 * @apiSuccess (200) {Number}    groups.timetableId   Group timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    groups.key           Group default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    groups.value         Group label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    groups.parentId      Group parent id - field
 */
router.get('/groups', function (req, res, next) {
    Label.findAll({
        attributes: [
            'id',
            'timetableId',
            'key',
            'value',
            'parentId'
        ],
        where: {
            type: 'G'
        }
    })
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.status(500).send();
        });
});

/**
 * @api {get} /buildings Buildings list
 * @apiPermission none
 * @apiDescription Returns current buildings list extracted from http://planzajec.uek.krakow.pl
 * @apiName getBuildings
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  buildings               Buildings list
 * @apiSuccess (200) {Number}    buildings.id            Building id
 * @apiSuccess (200) {String}    buildings.key           Building default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    buildings.value         Building label from http://planzajec.uek.krakow.pl or custom
 */
router.get('/buildings', function (req, res, next) {
    Label.findAll({
        attributes: [
            'id',
            'key',
            'value'
        ],
        where: {
            type: 'B'
        }
    })
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.status(500).send();
        });
});
/**
 * @api {get} /fields Fields list
 * @apiPermission none
 * @apiDescription Returns current fields list extracted from http://planzajec.uek.krakow.pl
 * @apiName getFields
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  fields               Fields list
 * @apiSuccess (200) {Number}    fields.id            Field id
 * @apiSuccess (200) {String}    fields.key           Field default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    fields.value         Field label from http://planzajec.uek.krakow.pl or custom
 */
router.get('/fields', function (req, res, next) {
    Label.findAll({
        attributes: [
            'id',
            'key',
            'value'
        ],
        where: {
            type: 'F'
        }
    })
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.status(500).send();
        });
});

/**
 * @api {get} /activities Activities list
 * @apiPermission none
 * @apiDescription Returns current activities list extracted from http://planzajec.uek.krakow.pl
 * @apiName getActivities
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  activities               Activities list
 * @apiSuccess (200) {Number}    activities.id            Activity id
 * @apiSuccess (200) {String}    activities.key           Activity default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    activities.value         Activity label from http://planzajec.uek.krakow.pl or custom
 */
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

/**
 * @api {get} /types TEvent types list
 * @apiPermission none
 * @apiDescription Returns current event types list extracted from http://planzajec.uek.krakow.pl
 * @apiName getTypes
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  types               Types list
 * @apiSuccess (200) {Number}    types.id            Type id
 * @apiSuccess (200) {String}    types.key           Type default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    types.value         Type label from http://planzajec.uek.krakow.pl or custom
 */
router.get('/types', function (req, res, next) {
    Label.findAll({
        attributes: [
            'id',
            'key',
            'value'
        ],
        where: {
            type: 'T'
        }
    })
        .then((data)=> {
            res.json(data);
        })
        .catch((err)=> {
            res.status(500).send();
        });
});

/**
 * @api {get} /notes Notes list
 * @apiPermission none
 * @apiDescription Returns current notes list extracted from http://planzajec.uek.krakow.pl
 * @apiName getNotes
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]}  notes               Notes list
 * @apiSuccess (200) {Number}    notes.id            Note id
 * @apiSuccess (200) {String}    notes.key           Note default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    notes.value         Note label from http://planzajec.uek.krakow.pl or custom
 */
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
/**
 * @api {get} /exceptions Exceptions list
 * @apiName getExceptions
 * @apiGroup Exception
 */

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
 * @api {get} /timetables/:timetables Events for :timetables
 * @apiPermission none
 * @apiDescription Returns events list from :timetables
 * @apiName getEvents
 * @apiGroup Timetable
 *
 * @apiSuccess (200) {Object[]}  events                    Events list
 * @apiSuccess (200) {Number}    events.id                 Event id
 * @apiSuccess (200) {Date}      events.date               Event date
 * @apiSuccess (200) {Number}    events.day                Event day number
 * @apiSuccess (200) {String}    events.from               Event time start
 * @apiSuccess (200) {String}    events.to                 Event time stop
 * @apiSuccess (200) {Number}    events.blocks             Event how many time blocks
 * @apiSuccess (200) {Boolean}   events.deleted            Event is deleted

 * @apiSuccess (200) {Object}    events.tutor              Tutor object
 * @apiSuccess (200) {Number}    events.tutor.id           Tutor id
 * @apiSuccess (200) {Number}    events.tutor.timetableId  Tutor timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.tutor.key          Tutor default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.tutor.value        Tutor label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    events.tutor.moodleId     Tutor id to his account in https://e-uczelnia.uek.krakow.pl
 * @apiSuccess (200) {Number}    events.tutor.parentId     Tutor parent id
 *
 * @apiSuccess (200) {Object}    events.room               Room object
 * @apiSuccess (200) {Number}    events.room.id            Room id
 * @apiSuccess (200) {Number}    events.room.timetableId   Room timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.room.key           Room default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.room.value         Room label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    events.room.parentId      Room parent id - building
 *
 * @apiSuccess (200) {Object}    events.group              Group object
 * @apiSuccess (200) {Number}    events.group.id           Group id
 * @apiSuccess (200) {Number}    events.group.timetableId  Group timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.group.key          Group default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.group.value        Group label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    events.group.parentId     Group parent id - field
 *
 * @apiSuccess (200) {Object}    events.activity           Activity object
 * @apiSuccess (200) {Number}    events.activity.id        Activity id
 * @apiSuccess (200) {String}    events.activity.key       Activity default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.activity.value     Activity label from http://planzajec.uek.krakow.pl or custom
 *
 * @apiSuccess (200) {Object}    events.type               Type object
 * @apiSuccess (200) {Number}    events.type.id            Type id
 * @apiSuccess (200) {String}    events.type.key           Type default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.type.value         Type label from http://planzajec.uek.krakow.pl or custom
 *
 * @apiSuccess (200) {Object}    events.note               Note object
 * @apiSuccess (200) {Number}    events.note.id            Note id
 * @apiSuccess (200) {String}    events.note.key           Note default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.note.value         Note label from http://planzajec.uek.krakow.pl or custom
 *
 */
router.get('/timetables/:timetables', (req, res, next)=> {

    Label.findAll({where: {id: req.params.timetables.split(',')}}).then((data)=> {
        Event.findAll({
            attributes: ['id', 'date', 'day', 'from', 'to', 'blocks', 'deleted'],
            include: [{
                model: models.label,
                as: 'tutor',
                attributes: [
                    'id',
                    'timetableId',
                    'key',
                    'value',
                    'moodleId',
                    'parentId'
                ]

            }, {
                model: models.label,
                as: 'group',
                attributes: [
                    'id',
                    'timetableId',
                    'key',
                    'value',
                    'parentId'
                ]
            }, {
                model: models.label,
                as: 'place',
                attributes: [
                    'id',
                    'timetableId',
                    'key',
                    'value',
                    'parentId'
                ]
            }, {
                model: models.label,
                as: 'activity',
                attributes: [
                    'id',
                    'key',
                    'value'
                ]
            }, {
                model: models.label,
                as: 'note',
                attributes: [
                    'id',
                    'key',
                    'value'
                ]
            }, {
                model: models.label,
                as: 'type',
                attributes: [
                    'id',
                    'key',
                    'value'
                ]
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
 * @api {get} /timetables/:timetables/tutors Tutors list from timetable
 * @apiPermission none
 * @apiDescription Returns tutors list from timetable
 * @apiName getTutors
 * @apiGroup Timetable
 *
 * @apiSuccess (200) {Object[]}  tutors               Tutors list
 * @apiSuccess (200) {Number}    tutors.id            Tutor id
 * @apiSuccess (200) {Number}    tutors.timetableId   Tutor timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    tutors.key           Tutor default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    tutors.value         Tutor label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    tutors.moodleId      Tutor id to his account in https://e-uczelnia.uek.krakow.pl
 * @apiSuccess (200) {Number}    tutors.parentId      Tutor parent id
 */
router.get('/timetables/:timetables/tutors', (req, res, next)=> {

    Event.findAll({

        include: [{
            model: models.label,
            as: 'tutor',
            attributes: [
                'id',
                'timetableId',
                'key',
                'value',
                'moodleId',
                'parentId'
            ]
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
 * @api {get} /timetables/:timetables/groups Groups list from timetable
 * @apiPermission none
 * @apiDescription Returns groups list from timetable
 * @apiName getGroups
 * @apiGroup Timetable
 *
 * @apiSuccess (200) {Object[]}  groups               Groups list
 * @apiSuccess (200) {Number}    groups.id            Group id
 * @apiSuccess (200) {Number}    groups.timetableId   Group timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    groups.key           Group default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    groups.value         Group label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    groups.parentId      Group parent id - field
 */

router.get('/timetables/:timetables/groups', (req, res, next)=> {
    Event.findAll({
        include: [{
            model: models.label,
            as: 'group',
            attributes: [
                'id',
                'timetableId',
                'key',
                'value',
                'parentId'
            ]
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
 * @api {get} /timetables/:timetables/rooms Rooms list from timetable
 * @apiPermission none
 * @apiDescription Returns rooms list from timetable
 * @apiName getRooms
 * @apiGroup Timetable
 *
 * @apiSuccess (200) {Object[]}  rooms               Rooms list
 * @apiSuccess (200) {Number}    rooms.id            Room id
 * @apiSuccess (200) {Number}    rooms.timetableId   Room timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    rooms.key           Room default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    rooms.value         Room label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    rooms.parentId      Room parent id - building
 */
router.get('/timetables/:timetables/rooms', (req, res, next)=> {
    Event.findAll({
        include: [{
            model: models.label,
            as: 'place',
            attributes: [
                'id',
                'timetableId',
                'key',
                'value',
                'parentId'
            ]
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
