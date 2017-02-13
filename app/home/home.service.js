'use strict';

angular.module('app.home').factory('HomeService', PeopleService);

PeopleService.$inject = ['$http'];
/* @ngInject */
function PeopleService($http) {

    var service = {
      
        getAverageInfectedPeople: getAverageInfectedPeople, 
        getAverageNonInfectedPeople : getAverageNonInfectedPeople,
        getAverageQuantityItemByPerson: getAverageQuantityItemByPerson,
        getTotalLostPoints: getTotalLostPoints,
      
    };
    
    function getAverageInfectedPeople() {
        
       return $http.get('http://zssn-backend-example.herokuapp.com/api/report/infected').then(handleSuccess, handleError('Error...'));
    }

    function getAverageNonInfectedPeople() {
        
        return $http.get('http://zssn-backend-example.herokuapp.com/api/report/non_infected').then(handleSuccess, handleError('Error...'));
    }

    function getAverageQuantityItemByPerson() {
        
        return $http.get('http://zssn-backend-example.herokuapp.com/api/report/people_inventory').then(handleSuccess, handleError('Error...'));
    }
    
    function getTotalLostPoints() {

        return $http.get('http://zssn-backend-example.herokuapp.com/api/report/infected_points').then(handleSuccess, handleError('Error...'));        
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
