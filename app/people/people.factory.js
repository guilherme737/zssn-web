'use strict';


//angular.module('app.people').factory('People', People);
//
//People.$inject = ['$resource', 'CONTEXT'];
///* @ngInject */
//function People($resource, CONTEXT) {
//
//    return $resource(CONTEXT + '/people/:id');
//}

angular.module('app.people').factory('PeopleService', PeopleService);

PeopleService.$inject = ['$http', 'CONTEXT'];
/* @ngInject */
function PeopleService($http, CONTEXT) {

    var service = {
      save: save,  
      getAll: getAll,
      getPeopleById: getPeopleById,
      //getOne: getOne
    };
    
    function save(person) {
        /*
        return $http({
            method: 'POST',
            url:'http://zssn-backend-example.herokuapp.com/api/people',            
            data: {"person":person}
        });
        */
        
       return $http.post('http://zssn-backend-example.herokuapp.com/api/people', person).then(handleSuccess, handleError('Error creating user'));
    }

    function getAll() {
        return $http({
            method: 'GET',
            url:'http://zssn-backend-example.herokuapp.com/api/people.json',            
            params: {}
        });
    }

    function getPeopleById(id) {

        return $http({
            method: 'GET', 
            url: 'http://zssn-backend-example.herokuapp.com/api/people/' + id + '.json', 
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
