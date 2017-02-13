(function () {
    'use strict';

    angular
            .module('app.exchange')
            .factory('ExchangeService', ExchangeService);

    function ExchangeService($http, $rootScope, localStorageService) {
        var service = {};

        $rootScope.personId = localStorageService.get('user') ? localStorageService.get('user').id : null;

        $rootScope.personName = localStorageService.get('user') ? localStorageService.get('user').name : null; ;

        service.getAllPeople = getAllPeople;
        
        service.getPeopleById = getPeopleById;
        
        service.updatePeople = updatePeople;
        
        service.getItems = getItems;
        
        service.getMyItems = getMyItems;
        
        service.myProfile = myProfile;
        
        service.setInfected = setInfected;
        
        service.makeExchange = makeExchange;

        

        function getAllPeople() {
            
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people')
                    .then(handleSuccess, handleError('Error getting all people'));
        }
        function getPeopleById(id) {
            
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people/' + $rootScope.personId)
                    .then(handleSuccess, handleError('Error getting person by id'));
        }
        function updatePeople(user) {
            
            return $http.patch('http://zssn-backend-example.herokuapp.com/api/people/' + user.id,
                    {
                        name: user.nome,
                        age: user.age,
                        gender: user.gender,
                        lonlat: user.lonlat
                    }).then(handleSuccess, handleError('Error updating people'));
        }
        
        function getMyItems() {
            
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people/' + $rootScope.personId + '/properties')
                    .then(handleSuccess, handleError('Error getting people by id'));
        }
        
        function getItems(id) {
            
            return $http.get('http://zssn-backend-example.herokuapp.com/api/people/' + id + '/properties')
                    .then(handleSuccess, handleError('Error getting people by id'));
        }
        
        function myProfile() {
            
            return localStorageService.get('user');
        }
        
        function setInfected(infected) {
            
            return $http.post('http://zssn-backend-example.herokuapp.com/api/people/' + $rootScope.personId + '/report_infection',
                    {
                        infected: infected,
                        id: $rootScope.peopleId
                    }).then(handleSuccess, handleError('Error creating people'));
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