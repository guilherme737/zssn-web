(function () {
    'use strict';

    angular.module('app.auth').controller('AuthController', AuthController);

    function AuthController($scope, $location, AuthService, PeopleService) {

        //Verifica se o usuário esta autenticado
        $scope.isAuth = AuthService.isAuth();

        //Função responsavel por realizar o login do sobrevivente
        $scope.login = function login(user) {
            
            PeopleService.getPeopleById(user.identificacao).then(function (data) {
               
                if (!data.message) {
                    //success
                    AuthService.setAuth(data);
//                    $location.path('/painel');
                    
                } else {
                    //fail
                }
            });
        }

        //Realiza logout do usuário
        $scope.logout = function logout() {
            AuthService.clearAuth();
        }

    }

})();