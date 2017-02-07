'use strict';

angular.module('app.home').factory('HomeService', PeopleService);

PeopleService.$inject = ['$http', 'CONTEXT'];
/* @ngInject */
function PeopleService($http, CONTEXT) {

    var service = {
      save: save,  
      getAll: getAll,
      getPeopleById: getPeopleById,
      //getOne: getOne
    };
    
    function getAverageInfectedPeople() {
        
        return $http({
            method: 'GET',
            url:'http://zssn-backend-example.herokuapp.com/api/report/infected',            
            params: {}
        });
        
//       return $http.get('http://zssn-backend-example.herokuapp.com/api/people').then(handleSuccess, handleError('Error creating user'));
    }

    function getAverageNonInfectedPeople() {
        return $http({
            method: 'GET',
            url:'http://zssn-backend-example.herokuapp.com/api/report/non_infected',
            params: {}
        });
    }

    function getAverageQuantityItemByPerson() {
        return $http({
            method: 'GET',
            url:'http://zssn-backend-example.herokuapp.com/api/report/people_inventory',
            params: {}
        });
    }
    
    function getTotalLostPoints() {
        return $http({
            method: 'GET',
            url:'http://zssn-backend-example.herokuapp.com/api/report/infected_points',
            params: {}
        });
    }
    
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
          return function () {
            return { success: false, message: error };
        };
    }

    return service;

}
