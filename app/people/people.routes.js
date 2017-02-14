'use strict';

angular.module('app.people').config(PeopleRoute);

PeopleRoute.$inject = ['$stateProvider'];
/* @ngInject */
function PeopleRoute($stateProvider) {

    $stateProvider.state('people/new',{
        name: '/people/new',
        controller: 'PeopleController',
        templateUrl: 'people/people.html',
        title: 'Register people'
        
    }).state('people.edit', {
        url: '/people/:id',
        controller: 'PeopleController',
        templateUrl: 'people/people.html',
        title: 'Edit people'
        
    }).state('people-report-infected',{
        url: '/people/people-report-infected',
        controller: 'PeopleController',
        templateUrl: 'people/people-report-infected.html',
        title: 'Report Infection'
    });
}
