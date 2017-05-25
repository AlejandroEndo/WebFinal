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
    control.registro(data, function (err) {
        if(!err){
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

router.post('/login', function (req, res) {
    var nick = req.body.nick;
    var pass = req.body.pass;

    if(nick == undefined || pass == undefined){
        console.log("Debe llenar todos los campos!");
        res.redirect('/');
    } else {
        control.login(nick, pass, function (err, rows) {
            if(!err) {
                res.json(rows);

                var string = JSON.stringify(rows);
                var result = JSON.parse(string);

                root.setUsuario(result[0]);
                console.log(result);
            } else {
                res.json(err);
            }
        });
    }
});

router.get('/getUser', function (req, res) {
    console.log(root.getUsuario());
    res.json(root.getUsuario());
});

router.get('/getAll', function (req, res) {
    console.log("AYYY DEBO OBTENERLOS A TODOOOOOOS");
    control.getAll(function (err, rows) {
        if(!err){
            res.json(rows);
        } else {
            res.json(err);
        }
    });
});

module.exports = router;