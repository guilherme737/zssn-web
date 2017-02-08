(function () {
    'use strict';

    angular
            .module('app.login')
            .factory('LoginService', LoginService);

    function LoginService($http, $rootScope, localStorageService, $location, $window) {
        var service = {};
//        var EstaAutenticado = false;

//        service.GetAll = GetAll;
//        service.GetById = GetById;
        
        service.setAuth = setAuth;
        service.isAuth = isAuth;
        service.clearAuth = clearAuth;

        return service;

//        function GetAll() {
//            return $http.get('http://zssn-backend-example.herokuapp.com/api/people').then(handleSuccess, handleError('Error getting all users'));
//        }
//
//        function GetById(id) {
//            return $http.get('http://zssn-backend-example.herokuapp.com/api/people/' + id).then(handleSuccess, handleError('Error getting user by id'));
//        }

        // private functions

//        function handleSuccess(res) {
//            return res.data;
//        }
//
//        function handleError(error) {
//            return function () {
//                return {success: false, message: error};
//            };
//        }

        function isAuth() {
            
            return localStorageService.get('autenticado');
        };

        function setAuth(username) {
            
            localStorageService.set('user', username);
            
            localStorageService.set('autenticado', true);
        }

        function clearAuth() {
            
            localStorageService.clearAll();
            
            $window.location.reload();
            
            $location.path('/');
        }
    }

})();