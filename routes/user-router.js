/**
 * Created by Endo on 24/05/2017.
 */

var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');

var root = require('../server');
var control = require('../controllers/user-controller');

var router = express.Router();
router.use(bodyparser.urlencoded({extended:false}));

router.post('/registro', function (req, res) {

    console.log(req.body);

    //guardar archivo en ubicacion final
    var targetPath = '../FinalWeb/public/images/' + req.file.filename;
    fs.rename(req.file.path, targetPath, function (err) {
        if(err){
            throw err;
        }

    });

    var data = {
        nick: req.body.nick,
        nombre: req.body.name,
        mail: req.body.mail,
        pass: req.body.pass,
        profimg: '/images/' + req.file.filename
    };

    console.log(data);

    control.registro(data, function (err) {
        if(!err){
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

module.exports = router;