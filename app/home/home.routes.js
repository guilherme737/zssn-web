'use strict';

angular.module('app.home').config(HomeRoute);

HomeRoute.$inject = ['$stateProvider'];
/* @ngInject */
function HomeRoute($stateProvider) {

    $stateProvider.state('home', {
        url: "/home",
        controller: 'HomeController',
        templateUrl: 'home/home.html',
        title: 'Dashboard'
    });    
}
