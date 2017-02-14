(function () {
    'use strict';

    angular.module('app.auth').factory('AuthService', AuthService);
    
    AuthService.$inject = ['$http', '$rootScope', 'localStorageService', '$location', '$window'];

    function AuthService($http, $rootScope, localStorageService, $location, $window) {
        
        var service = {};
        
        service.setAuth = setAuth;

        service.isAuth = isAuth;
        
        service.clearAuth = clearAuth;

        return service;


        function isAuth() {
            
            return localStorageService.get('authenticated');
        };

        function setAuth(username) {
            
            localStorageService.set('user', username);
            
            localStorageService.set('authenticated', true);
            
            $rootScope.personId = localStorageService.get('user') ? localStorageService.get('user').id : null;

            $rootScope.personName = localStorageService.get('user') ? localStorageService.get('user').name : null; ;
        }

        function clearAuth() {
            
            localStorageService.clearAll();
            
            $window.location.reload();
            
            $location.path('/');
        }
    }

})();