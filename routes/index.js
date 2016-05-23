"use strict";

var express = require('express');
var router = express.Router();
var Label = require('uekplan-models').label;
var LabelTutor = require('uekplan-models').labeltutor;
var Event = require('uekplan-models').event;
var Exception = require('uekplan-models').exception;
var models = require('uekplan-models');

var LABEL_TYPES = require('uekplan-models/labelTypes');
/**
 * @api {get} /labels Labels list
 * @apiPermission none
 * @apiDescription Returns all labels
 * @apiName getAllLabels
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]} labels                      Labels list
 * @apiSuccess (200) {Number}   labels.id                   Label id
 * @apiSuccess (200) {Number}   labels.timetableId          Label timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   labels.key                  Label default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   labels.value                Label label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {String}   labels.type                 Label type
 * @apiSuccess (200) {Number}   labels.labelId              Label parent id
 * @apiSuccess (200) {Boolean}  labels.orginal              If true label was extracted from from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {Object}   labels.labeltutor           LabelTutor info
 * @apiSuccess (200) {String}   labels.labeltutor.forename  Tutor forename extracted
 * @apiSuccess (200) {String}   labels.labeltutor.surname   Tutor surname extracted
 * @apiSuccess (200) {String}   labels.labeltutor.prefix    Tutor prefix extracted
 * @apiSuccess (200) {Number}   labels.labeltutor.moodleId  Label id to its account in https://e-uczelnia.uek.krakow.pl
 */
router.get('/labels', function (req, res, next) {
    Label
        .findAll({
            attributes: ['id', 'timetableId', 'key', 'value', 'type', 'labelId', 'orginal'],
            include: [{
                as: 'labeltutor',
                model: LabelTutor,
                exclude: ['labelId']
            }]
        })
        .then((data)=> {
            res.json({
                labels: data
            });
        })
        .catch((err)=> {
            res.status(500).send();
        });
});
/**
 * @api {get} /labels/:id Returns label with :id
 * @apiPermission none
 * @apiDescription Returns label with :id
 * @apiName getLabelById
 * @apiGroup Label
 *
 * @apiParam         {Number}   id                          Id of label
 *
 * @apiSuccess (200) {Object[]} label                       Label object
 * @apiSuccess (200) {Number}   label.id                    Label id
 * @apiSuccess (200) {Number}   label.timetableId           Label timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   label.key                   Label default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   label.value                 Label label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {String}   label.type                  Label type
 * @apiSuccess (200) {Number}   label.labelId               Label parent id
 * @apiSuccess (200) {Boolean}  label.orginal               If true label was extracted from from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {Object}   label.labeltutor            LabelTutor object
 * @apiSuccess (200) {String}   label.labeltutor.forename   Tutor forename extracted
 * @apiSuccess (200) {String}   label.labeltutor.surname    Tutor surname extracted
 * @apiSuccess (200) {String}   label.labeltutor.prefix     Tutor prefix extracted
 * @apiSuccess (200) {Number}   label.labeltutor.moodleId   Label id to its account in https://e-uczelnia.uek.krakow.pl
 */
router.get('/labels/:id', function (req, res, next) {
    Label
        .findOne({
            attributes: ['id', 'timetableId', 'key', 'value', 'type', 'labelId', 'orginal'],
            where: {
                id: req.params.id
            },
            include: [{
                as: 'labeltutor',
                model: LabelTutor,
                attributes: ['prefix', 'surename', 'forename', 'moodleId']
            }]
        })
        .then((data)=> {
            res.json({
                label: data
            });
        })
        .catch((err)=> {
            res.status(500).send();
        });
});
/**
 * @api {get} /labels/:query/find Find in labels
 * @apiPermission none
 * @apiDescription Returns current labels list extracted from http://planzajec.uek.krakow.pl and custom
 * @apiName findInLabels
 * @apiGroup Label
 *
 * @apiParam         {String}   query                       Query to seach

 * @apiSuccess (200) {Object[]} labels                      Labels list
 * @apiSuccess (200) {Number}   labels.id                   Label id
 * @apiSuccess (200) {Number}   labels.timetableId          Label timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   labels.key                  Label default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   labels.value                Label label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {String}   labels.type                 Label type
 * @apiSuccess (200) {Number}   labels.labelId              Label parent id
 * @apiSuccess (200) {Boolean}  labels.orginal              If true label was extracted from from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {Object}   labels.labeltutor           LabelTutor info
 * @apiSuccess (200) {String}   labels.labeltutor.forename  Tutor forename extracted
 * @apiSuccess (200) {String}   labels.labeltutor.surname   Tutor surname extracted
 * @apiSuccess (200) {String}   labels.labeltutor.prefix    Tutor prefix extracted
 * @apiSuccess (200) {Number}   labels.labeltutor.moodleId  Label id to its account in https://e-uczelnia.uek.krakow.pl
 */
router.get('/labels/:query/find', function (req, res, next) {
    Label
        .findAll({
            attributes: ['id', 'timetableId', 'key', 'value', 'type', 'labelId', 'orginal'],
            where: {
                $or: {
                    key: {$like: '%' + req.params.query + '%'},
                    value: {$like: '%' + req.params.query + '%'}
                }
            },
            include: [{
                as: 'labeltutor',
                model: LabelTutor,
                attributes: ['prefix', 'surename', 'forename', 'moodleId']
            }]
        })
        .then((data)=> {
            res.json({
                labels: data
            });
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).send();
        });
});
/**
 * @api {get} /tutors Tutors list
 * @apiPermission none
 * @apiDescription Returns current tutors list extracted from http://planzajec.uek.krakow.pl
 * @apiName getTutors
 * @apiGroup Label
 *
 * @apiSuccess (200) {Object[]} tutors               Tutors list
 * @apiSuccess (200) {Number}   tutors.id            Tutor id
 * @apiSuccess (200) {Number}   tutors.timetableId   Tutor timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   tutors.key           Tutor default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   tutors.value         Tutor label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Boolean}  tutors.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/tutors', function (req, res, next) {
    Label
        .findAll({
            attributes: ['id', 'timetableId', 'key', 'value', 'orginal'],
            where: {type: LABEL_TYPES.TUTOR},
            include: [{
                as: 'labeltutor',
                model: LabelTutor,
                attributes: ['prefix', 'surename', 'forename', 'moodleId']
            }]
        })
        .then((data)=> {
            res.json({tutors: data});
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).send();
        });
})
;
/**
 * @api {get} /rooms Rooms list
 * @apiPermission none
 * @apiDescription Returns current rooms list extracted from http://planzajec.uek.krakow.pl
 * @apiName getRooms
 * @apiGroup Label

 * @apiSuccess (200) {Object[]} rooms               Rooms list
 * @apiSuccess (200) {Number}   rooms.id            Room id
 * @apiSuccess (200) {Number}   rooms.timetableId   Room timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   rooms.key           Room default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}   rooms.value         Room label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}   rooms.labelId       Room parent id - building
 * @apiSuccess (200) {Boolean}  rooms.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/rooms', function (req, res, next) {
    Label
        .findAll({
            attributes: ['id', 'timetableId', 'key', 'value', 'labelId', 'orginal'],
            where: {
                type: LABEL_TYPES.ROOM
            }
        })
        .then((data)=> {
            res.json({rooms: data});
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
 * @apiSuccess (200) {Number}    groups.labelId      Group parent id - field,
 * @apiSuccess (200) {Boolean}      groups.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/groups', function (req, res, next) {
    Label
        .findAll({
            attributes: ['id', 'timetableId', 'key', 'value', 'labelId', 'orginal'],
            where: {type: LABEL_TYPES.GROUP}
        })
        .then((data)=> {
            res.json({groups: data});
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
 * @apiSuccess (200) {Boolean}      buildings.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/buildings', function (req, res, next) {
    Label
        .findAll({
            attributes: ['id', 'key', 'value', 'orginal'],
            where: {type: LABEL_TYPES.BUILDING}
        })
        .then((data)=> {
            res.json({buildings: data});
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
 * @apiSuccess (200) {Boolean}      fields.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/fields', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'key', 'value', 'orginal'],
        where: {type: LABEL_TYPES.FIELD}
    })
        .then((data)=> {
            res.json({fields: data});
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
 * @apiSuccess (200) {Boolean}      activities.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/activities', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'key', 'value', 'orginal'],
        where: {type: LABEL_TYPES.ACTIVITY}
    })
        .then((data)=> {
            res.json({activities: data});
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
 * @apiSuccess (200) {Boolean}      types.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/types', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'key', 'value', 'orginal'],
        where: {type: LABEL_TYPES.TYPE}
    })
        .then((data)=> {
            res.json({types: data});
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
 * @apiSuccess (200) {Boolean}      notes.orginal       If true label was extracted from from http://planzajec.uek.krakow.pl

 */
router.get('/notes', function (req, res, next) {
    Label.findAll({
        attributes: ['id', 'key', 'value', 'orginal'],
        where: {type: LABEL_TYPES.NOTE}
    })
        .then((data)=> {
            res.json({notes: data});
        })
        .catch((err)=> {
            res.status(500).send();
        })
});
/**
 * @api {get} /exceptions Exceptions list
 * @apiPermission none
 * @apiDescription Returns current exceptions list catched from http://planzajec.uek.krakow.pl
 * @apiName getExceptions
 * @apiGroup Exception
 *
 * @apiSuccess (200) {Object[]}  exceptions               Exceptions list
 * @apiSuccess (200) {Number}    exceptions.id            Exception id
 * @apiSuccess (200) {String}    exceptions.key           Exception value
 * @apiSuccess (200) {String}    exceptions.type          Where exception ocurred
 */
router.get('/exceptions', function (req, res, next) {
    Exception.findAll({
        attributes: ['id', 'key', 'type']
    })
        .then((data)=> {
            res.json({exceptions: data});
        })
        .catch((err)=> {
            res.status(500).send();
        })
});
/**
 * @api {post} /exceptions/add Add exception to labels
 * @apiPermission none
 * @apiDescription Add exception to labels
 * @apiName addException
 * @apiGroup Exception
 *
 * @apiParam {Number} id Exeption unique ID.
 *
 */
router.post('/exceptions/add', function (req, res, next) {
    Exception.findOne({
        attributes: ['key', 'type'],
        where: {id: req.body.id}
    })
        .then((data)=> {
            if (data) {
                data
                    .destroy()
                    .then(()=> {
                        data.dataValues.orginal = false;
                        Label
                            .create(data.dataValues)
                            .then((data)=> {
                                res.json(data);
                            })
                            .catch((err)=> {
                                console.log(err);
                                res.status(500).send();
                            });
                    }).catch((err)=> {
                    console.log(err);
                    res.status(500).send();
                });
            } else {
                res.status(201).send();
            }
        })
        .catch((err)=> {
            console.log(err);
            res.status(500).send();
        });
});

/**
 * @api {post} /exceptions/update Update Label value with tutor exception
 * @apiPermission none
 * @apiDescription Add exception to labels
 * @apiName updateException
 * @apiGroup Exception
 *
 * @apiParam {Number} exceptionId Exeption unique ID.
 * @apiParam {Number} labelId Label unique ID.

 *
 */
router.post('/exceptions/update', function (req, res, next) {
    Exception.findOne({
        attributes: ['key', 'type'],
        where: {id: req.body.exceptionId}
    })
        .then((data)=> {
            if (data) {
                data
                    .destroy()
                    .then(()=> {
                        Label
                            .update({value: data.dataValues.key}, {
                                where: {
                                    id: req.body.labelId,
                                    type: data.dataValues.type
                                }
                            })
                            .then((data)=> {
                                res.json(data);
                            })
                            .catch((err)=> {
                                res.status(500).send();
                            });
                    })
                    .catch((err)=> {
                        res.status(500).send();
                    })
            } else {
                res.status(404).send();
            }
        })
        .catch((err)=> {
            res.status(500).send();
        });
});


/**
 * @api {get} /events/:labels Get events
 * @apiPermission none
 * @apiDescription Returns events list from :labels
 * @apiName getEvents
 * @apiGroup Event
 *
 * @apiParam (query) {String}    [excludeLabels]
 * It excludes from search labels id in activityId, tutorId, groupId, placeId, noteId, typeId.
 * It accepts numbers separated by commas.
 * @apiParam (query) {String}    [excludeActivities]
 * It accpets  groups of 4 numbers separated by commas. Groups are separated by pipe character.
 *
 * Example: excludeActivities=tutorId,groupId,activityId,typeId|tutorId,groupId,activityId,typeId
 *
 * @apiSuccess (200) {Object[]}  events                    Events list
 * @apiSuccess (200) {Number}    events.id                 Event id
 * @apiSuccess (200) {Date}      events.date               Event date
 * @apiSuccess (200) {Number}    events.day                Event day number
 * @apiSuccess (200) {String}    events.from               Event time start
 * @apiSuccess (200) {String}    events.to                 Event time stop
 * @apiSuccess (200) {Number}    events.blocks             Event how many time blocks
 * @apiSuccess (200) {Boolean}   events.deleted            Event is deleted
 * @apiSuccess (200) {Object}    events.tutor                       Tutor object
 * @apiSuccess (200) {Number}    events.tutor.id                    Tutor id
 * @apiSuccess (200) {Number}    events.tutor.timetableId           Tutor timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.tutor.key                   Tutor default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.tutor.value                 Tutor label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {String}    events.tutor.labeltutor.forename   Tutor forename extracted
 * @apiSuccess (200) {String}    events.tutor.labeltutor.surname    Tutor surname extracted
 * @apiSuccess (200) {String}    events.tutor.labeltutor.prefix     Tutor prefix extracted
 * @apiSuccess (200) {Number}    events.tutor.labeltutor.moodleId   Tutor id to his account in https://e-uczelnia.uek.krakow.pl
 * @apiSuccess (200) {Number}    events.tutor.labelId               Tutor parent id
 * @apiSuccess (200) {Object}    events.room               Room object
 * @apiSuccess (200) {Number}    events.room.id            Room id
 * @apiSuccess (200) {Number}    events.room.timetableId   Room timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.room.key           Room default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.room.value         Room label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    events.room.parentId      Room parent id - building
 * @apiSuccess (200) {Object}    events.group              Group object
 * @apiSuccess (200) {Number}    events.group.id           Group id
 * @apiSuccess (200) {Number}    events.group.timetableId  Group timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.group.key          Group default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.group.value        Group label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Number}    events.group.parentId     Group parent id - field
 * @apiSuccess (200) {Object}    events.activity           Activity object
 * @apiSuccess (200) {Number}    events.activity.id        Activity id
 * @apiSuccess (200) {String}    events.activity.key       Activity default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.activity.value     Activity label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Object}    events.type               Type object
 * @apiSuccess (200) {Number}    events.type.id            Type id
 * @apiSuccess (200) {String}    events.type.key           Type default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.type.value         Type label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {Object}    events.note               Note object
 * @apiSuccess (200) {Number}    events.note.id            Note id
 * @apiSuccess (200) {String}    events.note.key           Note default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    events.note.value         Note label from http://planzajec.uek.krakow.pl or custom
 *
 */
router.get('/events/:labels', (req, res, next)=> {


    if (!req.query.excludeLabels) {
        req.query.excludeLabels = '';
    }
    if (!req.query.labels) {
        req.query.labels = '';
    }
    if (!req.query.from) {
        req.query.from = '';
    }
    if (!req.query.to) {
        req.query.to = '';
    }
    if (!req.query.excludeActivities) {
        req.query.excludeActivities = '';
    }
    Event.findAndCountAll({
        attributes: ['id', 'date', 'day', 'from', 'to', 'blocks', 'deleted'],
        include: [
            {
                model: Label,
                as: 'tutor',
                attributes: ['id', 'timetableId', 'key', 'value', 'labelId'],
                include: [{
                    as: 'labeltutor',
                    model: LabelTutor,
                    attributes: ['prefix', 'surename', 'forename', 'moodleId']
                }]
            }, {
                model: Label,
                as: 'group',
                attributes: ['id', 'timetableId', 'key', 'value', 'labelId']
            }, {
                model: Label,
                as: 'place',
                attributes: ['id', 'timetableId', 'key', 'value', 'labelId']
            }, {
                model: Label,
                as: 'activity',
                attributes: ['id', 'key', 'value']
            }, {
                model: Label,
                as: 'note',
                attributes: ['id', 'key', 'value']
            }, {
                model: Label,
                as: 'type',
                attributes: ['id', 'key', 'value']
            }],
        where: {
            $or: {
                noteId: {$in: req.params.labels.split(',')},
                activityId: {$in: req.params.labels.split(',')},
                typeId: {$in: req.params.labels.split(',')},
                tutorId: {$in: req.params.labels.split(',')},
                groupId: {$in: req.params.labels.split(',')},
                placeId: {$in: req.params.labels.split(',')}
            },
            $and: (req.query.excludeLabels) ? {
                noteId: {$notIn: req.query.excludeLabels.split(',')},
                activityId: {$notIn: req.query.excludeLabels.split(',')},
                typeId: {$notIn: req.query.excludeLabels.split(',')},
                tutorId: {$notIn: req.query.excludeLabels.split(',')},
                groupId: {$notIn: req.query.excludeLabels.split(',')},
                placeId: {$notIn: req.query.excludeLabels.split(',')}
            } : null,
            date: (req.query.to && req.query.from) ? {
                $lt: req.query.to,
                $gt: req.query.from
            } : {$ne: null}
        },
        order: [
            ['date', 'ASC'],
            ['from', 'ASC']]
    })
        .then((data)=> {

            var filterActivities = (event) => {
                var groups = req.query.excludeActivities.split('|');
                for (var i = 0; i < groups.length; i++) {
                    var rules = groups[i].split(',');

                    if (event.tutor.id === parseInt(rules[0])
                        && event.group.id === parseInt(rules[1])
                        && event.activity.id === parseInt(rules[2])
                        && event.type.id === parseInt(rules[3])
                    ) {
                        return false;
                    }
                }
                return true;
            };

            res.json({events: data.rows.filter(filterActivities), count: data.rows.filter(filterActivities).length});
        })
        .catch((err)=> {
            res.sendStatus(500);
        })
});

/**
 * @api {get} /events/:labels/tutors Tutors list from timetable
 * @apiPermission none
 * @apiDescription Returns tutors list from timetable
 * @apiName getTutors
 * @apiGroup Timetable
 *
 *
 * @apiSuccess (200) {Object[]}  tutors               Tutors list
 * @apiSuccess (200) {Number}    tutors.id            Tutor id
 * @apiSuccess (200) {Number}    tutors.timetableId   Tutor timetableId from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    tutors.key           Tutor default name from http://planzajec.uek.krakow.pl
 * @apiSuccess (200) {String}    tutors.value         Tutor label from http://planzajec.uek.krakow.pl or custom
 * @apiSuccess (200) {String}    tutors.forename     Tutor forename extracted
 * @apiSuccess (200) {String}    tutors.surname      Tutor surname extracted
 * @apiSuccess (200) {String}    tutors.prefix       Tutor prefix extracted
 * @apiSuccess (200) {Number}    tutors.moodleId      Tutor id to his account in https://e-uczelnia.uek.krakow.pl
 * @apiSuccess (200) {Number}    tutors.parentId      Tutor parent id
 */
router.get('/events/:labels/tutors', (req, res, next)=> {

    if (!req.query.excludeLabels) {
        req.query.excludeLabels = '';
    }
    if (!req.query.labels) {
        req.query.labels = '';
    }
    if (!req.query.from) {
        req.query.from = '';
    }
    if (!req.query.to) {
        req.query.to = '';
    }
    if (!req.query.excludeActivities) {
        req.query.excludeActivities = '';
    }
    Event.findAll({
        attributes: ['typeId', 'activityId', 'groupId'],
        group: '`tutorId`',
        include: [{
            model: Label,
            as: 'tutor',
            attributes: ['id', 'timetableId', 'key', 'value', 'labelId'],
            include: [{
                as: 'labeltutor',
                model: LabelTutor,
                attributes: ['prefix', 'surename', 'forename', 'moodleId']
            }]
        }],
        where: {
            $or: {
                noteId: {$or: req.params.labels.split(',')},
                activityId: {$or: req.params.labels.split(',')},
                typeId: {$or: req.params.labels.split(',')},
                tutorId: {$or: req.params.labels.split(',')},
                groupId: {$or: req.params.labels.split(',')},
                placeId: {$or: req.params.labels.split(',')}
            },
            $and: (req.query.excludeLabels) ? {
                noteId: {$notIn: req.query.excludeLabels.split(',')},
                activityId: {$notIn: req.query.excludeLabels.split(',')},
                typeId: {$notIn: req.query.excludeLabels.split(',')},
                tutorId: {$notIn: req.query.excludeLabels.split(',')},
                groupId: {$notIn: req.query.excludeLabels.split(',')},
                placeId: {$notIn: req.query.excludeLabels.split(',')}
            } : null,
            date: (req.query.to && req.query.from) ? {
                $lt: req.query.to,
                $gt: req.query.from
            } : {$ne: null}
        },
        order: [
            [{model: Label, as: 'tutor'}, 'key', 'ASC']
        ]
    })
        .then((data)=> {
            var filterActivities = (event) => {
                var groups = req.query.excludeActivities.split('|');
                for (var i = 0; i < groups.length; i++) {
                    var rules = groups[i].split(',');
                    if (event.tutorId === parseInt(rules[0])
                        && event.groupId === parseInt(rules[1])
                        && event.activityId === parseInt(rules[2])
                        && event.typeId === parseInt(rules[3])
                    ) {
                        return false;
                    }
                }
                return true;
            };
            var removeUnwantedFields = (event)=> {
                return event.tutor;
            };

            res.json({tutors: data.filter(filterActivities).map(removeUnwantedFields)});
        }).catch((err)=> {
        console.log(err);
        res.sendStatus(500);
    })


});

/**
 * @api {get} /events/:labels/groups Groups list from timetable
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

router.get('/events/:labels/groups', (req, res, next)=> {
    if (!req.query.excludeLabels) {
        req.query.excludeLabels = '';
    }
    if (!req.query.labels) {
        req.query.labels = '';
    }
    if (!req.query.from) {
        req.query.from = '';
    }
    if (!req.query.to) {
        req.query.to = '';
    }
    if (!req.query.excludeActivities) {
        req.query.excludeActivities = '';
    }
    Event.findAll({
        attributes: ['typeId', 'activityId', 'tutorId'],
        group: '`groupId`',
        include: [{
            model: models.label,
            as: 'group',
            attributes: ['id', 'timetableId', 'key', 'value', 'labelId']
        }],
        where: {
            $or: {
                noteId: {$or: req.params.labels.split(',')},
                activityId: {$or: req.params.labels.split(',')},
                typeId: {$or: req.params.labels.split(',')},
                tutorId: {$or: req.params.labels.split(',')},
                groupId: {$or: req.params.labels.split(',')},
                placeId: {$or: req.params.labels.split(',')}
            },
            $and: (req.query.excludeLabels) ? {
                noteId: {$notIn: req.query.excludeLabels.split(',')},
                activityId: {$notIn: req.query.excludeLabels.split(',')},
                typeId: {$notIn: req.query.excludeLabels.split(',')},
                tutorId: {$notIn: req.query.excludeLabels.split(',')},
                groupId: {$notIn: req.query.excludeLabels.split(',')},
                placeId: {$notIn: req.query.excludeLabels.split(',')}
            } : null,
            date: (req.query.to && req.query.from) ? {
                $lt: req.query.to,
                $gt: req.query.from
            } : {$ne: null}
        },
        order: [
            [{model: Label, as: 'group'}, 'key', 'ASC']
        ]
    }).then((data)=> {


        var filterActivities = (event) => {
            var groups = req.query.excludeActivities.split('|');
            for (var i = 0; i < groups.length; i++) {
                var rules = groups[i].split(',');
                if (event.tutorId === parseInt(rules[0])
                    && event.groupId === parseInt(rules[1])
                    && event.activityId === parseInt(rules[2])
                    && event.typeId === parseInt(rules[3])
                ) {
                    return false;
                }
            }
            return true;
        };
        var removeUnwantedFields = (event)=> {
            return event.group;
        };

        res.json({groups: data.filter(filterActivities).map(removeUnwantedFields)});
    });
});
/**
 * @api {get} /events/:labels/rooms Rooms list from timetable
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
router.get('/events/:labels/rooms', (req, res, next)=> {
    if (!req.query.excludeLabels) {
        req.query.excludeLabels = '';
    }
    if (!req.query.labels) {
        req.query.labels = '';
    }
    if (!req.query.from) {
        req.query.from = '';
    }
    if (!req.query.to) {
        req.query.to = '';
    }
    if (!req.query.excludeActivities) {
        req.query.excludeActivities = '';
    }
    Event.findAll({
        attributes: ['typeId', 'activityId', 'tutorId', 'groupId'],
        group: '`placeId`',
        include: [{
            model: models.label,
            as: 'place',
            attributes: ['id', 'timetableId', 'key', 'value', 'labelId'],
        }],
        where: {
            $or: {
                noteId: {$or: req.params.labels.split(',')},
                activityId: {$or: req.params.labels.split(',')},
                typeId: {$or: req.params.labels.split(',')},
                tutorId: {$or: req.params.labels.split(',')},
                groupId: {$or: req.params.labels.split(',')},
                placeId: {$or: req.params.labels.split(',')}
            },
            $and: (req.query.excludeLabels) ? {
                noteId: {$notIn: req.query.excludeLabels.split(',')},
                activityId: {$notIn: req.query.excludeLabels.split(',')},
                typeId: {$notIn: req.query.excludeLabels.split(',')},
                tutorId: {$notIn: req.query.excludeLabels.split(',')},
                groupId: {$notIn: req.query.excludeLabels.split(',')},
                placeId: {$notIn: req.query.excludeLabels.split(',')}
            } : null,
            date: (req.query.to && req.query.from) ? {
                $lt: req.query.to,
                $gt: req.query.from
            } : {$ne: null}
        },
        order: [
            [{model: Label, as: 'place'}, 'key', 'ASC']
        ]
    })
        .then((data)=> {
            var filterActivities = (event) => {
                var groups = req.query.excludeActivities.split('|');
                for (var i = 0; i < groups.length; i++) {
                    var rules = groups[i].split(',');
                    if (event.tutorId === parseInt(rules[0])
                        && event.groupId === parseInt(rules[1])
                        && event.activityId === parseInt(rules[2])
                        && event.typeId === parseInt(rules[3])
                    ) {
                        return false;
                    }
                }
                return true;
            };
            var removeUnwantedFields = (event)=> {
                return event.place;
            };

            res.json({places: data.filter(filterActivities).map(removeUnwantedFields)});
        }).catch((err)=> {
        console.log(err);
        res.sendStatus(500);
    })
});


/**
 * @api {get} /events/:labels/activites Activites list from timetable with tutors
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
router.get('/events/:labels/activities', (req, res, next)=> {
    if (!req.query.excludeLabels) {
        req.query.excludeLabels = '';
    }
    if (!req.query.labels) {
        req.query.labels = '';
    }
    Event.findAll({

        attributes: [],
        group: '`typeId`,`activityId`,`tutorId`,`groupId`',
        include: [{
            model: Label,
            as: 'tutor',
            attributes: ['id', 'timetableId', 'key', 'value', 'labelId'],
            include: [{
                as: 'labeltutor',
                model: LabelTutor,
                attributes: ['prefix', 'surename', 'forename', 'moodleId']
            }]
        }, {
            model: Label,
            as: 'group',
            attributes: ['id', 'timetableId', 'key', 'value', 'labelId']
        }, {
            model: Label,
            as: 'activity',
            attributes: ['id', 'timetableId', 'key', 'value']
        }, {
            model: Label,
            as: 'type',
            attributes: ['id', 'timetableId', 'key', 'value']
        }
        ],
        where: {
            $or: {
                noteId: {$or: req.params.labels.split(',')},
                activityId: {$or: req.params.labels.split(',')},
                typeId: {$or: req.params.labels.split(',')},
                tutorId: {$or: req.params.labels.split(',')},
                groupId: {$or: req.params.labels.split(',')},
                placeId: {$or: req.params.labels.split(',')}
            },
            $and: (req.query.excludeLabels) ? {
                noteId: {$notIn: req.query.excludeLabels.split(',')},
                activityId: {$notIn: req.query.excludeLabels.split(',')},
                typeId: {$notIn: req.query.excludeLabels.split(',')},
                tutorId: {$notIn: req.query.excludeLabels.split(',')},
                groupId: {$notIn: req.query.excludeLabels.split(',')},
                placeId: {$notIn: req.query.excludeLabels.split(',')}
            } : null,
            date: (req.query.to && req.query.from) ? {
                $lt: req.query.to,
                $gt: req.query.from
            } : {$ne: null}
        },
        order: [
            [{model: Label, as: 'activity'}, 'key', 'ASC'],
            [{model: Label, as: 'type'}, 'key', 'ASC']
        ]
    }).then((data)=> {


        res.json(data);

    }).catch((err)=> {
        console.log(err);
        res.sendStatus(500);
    })
});

module.exports = router;
