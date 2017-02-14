'use strict';

angular.module('app.people').factory('PeopleService', PeopleService);

PeopleService.$inject = ['$http', '$rootScope', 'localStorageService'];
/* @ngInject */
function PeopleService($http, $rootScope, localStorageService) {

    var service = {

        save: save,
        getAll: getAll,
        getPeopleById: getPeopleById,
        setInfected: setInfected

    };

    function save(person) {

        return $http.post('http://zssn-backend-example.herokuapp.com/api/people', person).then(handleSuccess, handleError('Error creating user'));
    }

    function getAll() {

        return $http.get('http://zssn-backend-example.herokuapp.com/api/people.json').then(handleSuccess, handleError('Error getting all persons'));
    }

    function getPeopleById(id) {

        return $http.get('http://zssn-backend-example.herokuapp.com/api/people/' + id).then(handleSuccess, handleError('Error getting user by id'));
    }

    function setInfected(infected) {

        return $http.post('http://zssn-backend-example.herokuapp.com/api/people/' + localStorageService.get('user').id + '/report_infection', {infected: infected, id: $rootScope.personId}).then(handleSuccess, handleError('Error while reporting infection.'));
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
