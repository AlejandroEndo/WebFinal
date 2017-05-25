/**
 * Created by Endo on 24/05/2017.
 */

var db = require('../database');

exports.registro = function (data, callback) {

    db.getConection().query('INSERT INTO usuarios SET ?', data, function (err, rows) {
        if(err){
            console.log(err);
            return callback(err);
        }
        callback(null, rows);
    });
};

exports.login = function (nick, pass, callback) {
    db.getConection().query('SELECT * FROM usuarios where nick = ?', nick, function (err, rows) {
        if (!err) {
            //console.log(rows);
            if(rows[0] != null) {
                if (rows[0].pass == pass) {
                    //console.log("Datos correctos");
                    loged = true;
                    callback(false, rows);
                } else {
                    //console.log(pass);
                    callback(true);
                }
            } else {
                //console.log("Usuario incorrecto");
                callback(true);
            }
        } else {
            console.log(err);
        }
    });
};

exports.getAll = function (callback) {
    db.getConection().query('SELECT * FROM usuarios', function (err, rows) {
        if(err){
            return callback(true);
        }
        return callback(false, rows);
    });
};