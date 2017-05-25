/**
 * Created by Endo on 24/05/2017.
 */
var db = require('../database');

exports.getHistorias = function (data, callback) {

    db.getConection().query('SELECT * FROM historia WHERE nick = ?', data, function (err, rows) {
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.getAllHistorias = function (callback) {

    db.getConection().query('SELECT * FROM historia',function (err, rows) {
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.nuevaHistoria = function (data, callback) {
    db.getConection().query('INSERT INTO historia SET ?', data, function (err, rows) {
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.getComentarios = function (data, callback) {
    db.getConection().query('SELECT * FROM comentarios WHERE id_post = ?', data, function (err, rows) {
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.getHistoria = function (data, callback) {
    db.getConection().query('SELECT * FROM historia WHERE id_post = ?', data, function (err, rows) {
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.newComentario = function (data, callback) {
    db.getConection().query('INSERT INTO comentarios SET ?', data, function (err, rows) {
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, rows);
    });
};