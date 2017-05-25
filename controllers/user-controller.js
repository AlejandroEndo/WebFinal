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