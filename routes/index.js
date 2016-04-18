var express = require('express');
var router = express.Router();
var Label = require('uekplan-models/label');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'uekplan'});
});

/* GET home page. */
router.get('/tutors', function (req, res, next) {

    Label.find()
        .where('type').equals('N').populate('parentId')
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});
/* GET home page. */
router.get('/rooms', function (req, res, next) {

    Label.find()
        .where('type').equals('S').populate('parentId')
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});
/* GET home page. */
router.get('/groups', function (req, res, next) {
    Label.find()
        .where('type').equals('G').populate('parentId')
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});


/* GET home page. */
router.get('/buildings', function (req, res, next) {
    Label.find()
        .where('type').equals('B')
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});
/* GET home page. */
router.get('/fields', function (req, res, next) {
    Label.find()
        .where('type').equals('F')
        .then((data)=> {
            res.json(data);
        }).catch((err)=> {
        res.status(500).send();
    })
});


module.exports = router;
