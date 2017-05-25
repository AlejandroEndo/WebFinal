/**
 * Created by Endo on 24/05/2017.
 */

var app = angular.module('myApp', []);

var userdata;

app.controller('loginCtrl', function ($window, $scope, $http) {

    $scope.login = function () {

        var data = {
            nick: $scope.nick,
            pass: $scope.pass
        };

        $http.post('user/login', JSON.stringify(data)).then(function (res) {
            userdata = res.data[0];
            console.log('USUARIO REGISTRADO');
            console.log(userdata);
            $window.location.href = 'wall.html';
        });
    };
});

app.controller('registroCtrl', function ($window, $scope, $http) {

    $scope.registrar = function () {
        var data = {
            nick: $scope.nick,
            name: $scope.name,
            mail: $scope.mail,
            pass: $scope.pass
        };
    }
});