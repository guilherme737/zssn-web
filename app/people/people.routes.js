'use strict';

angular.module('app.people').config(PeopleRoute);

PeopleRoute.$inject = ['$stateProvider'];
/* @ngInject */
function PeopleRoute($stateProvider) {

    $stateProvider.state({
        name: 'people',
        controller: 'PeopleController',
        templateUrl: 'people/people.list.html',
        title: 'Search people'
        
    }).state({
        name: 'people/new',
        controller: 'PeopleController',
        templateUrl: 'people/people.form.html',
        title: 'Register people'
        
    }).state({
        name: 'people/:id',
        controller: 'PeopleController',
        templateUrl: 'people/people.form.html',
        title: 'Edit people'
    });
}
