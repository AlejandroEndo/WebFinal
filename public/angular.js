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

app.controller('wallCtrl', function ($window, $scope, $http) {
    var miHistoria;
    $http.get('/user/getUser').then(function (res) {
        userdata = res.data;
        console.log(res);
        $scope.nick = userdata.nick;
        $scope.imagen = userdata.profimg;

        $http.get('wall/misHistorias').then(function (res) {
            $scope.misHistorias = res.data;
            console.log($scope.nick);
        });

        $http.get('wall/historias').then(function (res) {
            $scope.historias = res.data;
            console.log($scope.nick);
        });

        $scope.seleccionarHistoria = function (laHistoria) {
            miHistoria = {
                id_post: laHistoria
            };
            console.log(miHistoria);
            $http.post('wall/comentarios', miHistoria).then(function (res) {
                $scope.comentarios = res.data;
            });
        };
        $http.get('/user/getAll').then(function (res) {
            console.log(res);
            $scope.usuarios = res.data;
        });
    });

    $scope.compartir = function () {
        var usuario = {
            nick: $scope.usuarioSeleccionado.singleSelect
        };

        console.log(usuario);
        
        $http.post('/user/compartir', JSON.stringify(usuario)).then(function (res) {
            $window.location.href = 'wall.html';
        });
    };
});
