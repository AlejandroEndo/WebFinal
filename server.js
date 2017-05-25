/**
 * Created by Endo on 24/05/2017.
 */

var express = require('express');
var bodyparser = require('body-parser');
var morgan = require('morgan');
var multer = require('multer');

var db = require('./database');
var user = require('./routes/user-router');
var wall = require('./routes/wall-router');

var usuario;
var historia;

var app = express();

exports.setHistoria = function (nuevo) {
    historia = nuevo;
};

exports.getHistoria = function () {
    return historia;
};

exports.setUsuario = function (nuevo) {
    usuario = nuevo;
};

exports.getUsuario = function () {
    return usuario;
};

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));

app.use(multer({dest : './uploads'}).single('photo'));

app.use('/user', user);
app.use('/wall', wall);

db.poolConection(function (err) {
    if(err){
        console.log("Error al conectarse a la Base de datos");
        process.exit(1);
    } else {
        var host = 'localhost';
        var port = 3000;

        app.listen(port, host, function () {
            console.log('Listening on || http://' + host + ':' + port + '/');
        });
    }
});