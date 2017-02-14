(function () {
    'use strict';

    angular.module('app.auth').controller('AuthController', AuthController);

    function AuthController($scope, $window, AuthService, PeopleService) {

        $scope.isAuth = AuthService.isAuth();

        $scope.login = function login(person) {
            
            PeopleService.getPeopleById(person.identificacao).then(function (data) {
               
                if (!data.message) {
                    //success
                    AuthService.setAuth(data);
                    
                    $window.location.reload();
                    
                } else {
                    //fail
                }
            });
        };

        $scope.logout = function logout() {
            AuthService.clearAuth();
        };

    }

})();