/**
 * Created by Endo on 24/05/2017.
 */

var express = require('express');
var bodyparser = require('body-parser');
var fs = require('fs');

var root = require('../server');
var control = require('../controllers/wall-controller');

var router = express.Router();
router.use(bodyparser.urlencoded({extended:false}));

router.post('/new_post', function (req, res) {
    console.log(req.body);
});

router.get('/misHistorias', function (req, res) {
    console.log("CoÑO E LA MADRE");
    console.log(root.getUsuario() );
    control.getHistorias( root.getUsuario().nick ,function (err,rows) {
        if(!err)
            res.json(rows);
        else {
            res.json(err);
        }
    });
});

router.get('/historias', function (req, res) {
    control.getAllHistorias(function (err,rows) {
        if(!err)
            res.json(rows);
        else {
            res.json(err);
        }
    });
});

router.post('/newStory', function (req, res) {
    console.log(req.file);
    console.log(req.body);

    var targetPath = '../FinalWeb/public/images/' + req.file.filename;
    fs.rename(req.file.path, targetPath, function (err) {
        if(err){
            throw err;
        }

    });

    var data = {
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        image: '/images/' + req.file.filename,
        nick: root.getUsuario().nick,
        profimg: root.getUsuario().profimg
    };

    control.nuevaHistoria(data, function (err) {
        if(!err){
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

router.post('/comentarios', function (req, res) {
    console.log(req.body);
    var id = req.body.id_post;

    control.getHistoria(id, function (err, rows) {
        if(!err){
            var string = JSON.stringify(rows);
            var result = JSON.parse(string);

            root.setHistoria(result[0]);
            console.log("MI NUEVA HISTORIA ES:");
            console.log(root.getHistoria());
        }
    });

    control.getComentarios(id, function (err, rows) {
        if(!err){
            res.json(rows);
        } else {
            res.json(err);
        }
    });
});

router.post('/newComentario', function (req, res) {
    console.log(req.body);
    console.log(req.file);

    var targetPath = '../FinalWeb/public/images/' + req.file.filename;
    fs.rename(req.file.path, targetPath, function (err) {
        if(err){
            throw err;
        }
    });

    var data = {
        contenido: req.body.contenido,
        image: '/images/' + req.file.filename,
        nick: root.getUsuario().nick,
        profimg: root.getUsuario().profimg,
        id_post: root.getHistoria().id_post
    };

    console.log("VOY A AGREGAR ESTE COMENTARIO");
    console.log(data);

    control.newComentario(data, function (err) {
        if(!err){
            res.redirect('/wall.html');
        } else {
            res.json(err);
        }
    });
});

module.exports = router;