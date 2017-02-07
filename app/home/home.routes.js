'use strict';

angular.module('app.home').config(PeopleHome);

HomeRoute.$inject = ['$routeProvider'];
/* @ngInject */
function HomeRoute($routeProvider) {

    $routeProvider.when('/home', {
        controller: 'HomeController',
        templateUrl: 'home/home.html',
        title: 'Dashboard'
    });    
}
