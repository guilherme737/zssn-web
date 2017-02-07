'use strict';

angular.module('app.people').config(PeopleRoute);

PeopleRoute.$inject = ['$routeProvider'];
/* @ngInject */
function PeopleRoute($routeProvider) {

    $routeProvider.when('/people', {
        controller: 'PeopleController',
        templateUrl: 'people/people.list.html',
        title: 'Search people'
    });
    $routeProvider.when('/people/new', {
        controller: 'PeopleController',
        templateUrl: 'people/people.form.html',
        title: 'Register people'
    });
    $routeProvider.when('/people/:id', {
        controller: 'PeopleController',
        templateUrl: 'people/people.form.html',
        title: 'Edit people'
    });
}
