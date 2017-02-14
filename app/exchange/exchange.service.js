(function () {
    'use strict';

    angular
            .module('app.exchange')
            .factory('ExchangeService', ExchangeService);

    function ExchangeService($http, $rootScope, localStorageService) {
        var service = {};

        $rootScope.personId = localStorageService.get('user') ? localStorageService.get('user').id : null;

        $rootScope.personName = localStorageService.get('user') ? localStorageService.get('user').name : null; ;
     
        service.getMyItems = getMyItems;
                
        service.makeExchange = makeExchange;

      
        function getMyItems() {
            
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people/' + $rootScope.personId + '/properties')
                    .then(handleSuccess, handleError('Error getting people by id'));
        }
                
        function makeExchange(data) {
            
            return $http.post('http://zssn-backend-example.herokuapp.com/api/people/' + data.person_id + '/properties/trade_item', data)
                    .then(handleSuccess, handleError('Error creating user'));
        }

        function handleSuccess(res) {
            
            return res.data;
        }

        function handleError(error) {
            
            return function () {
                return {success: false, message: error};
            };
        }
        
        return service;
    }

})();