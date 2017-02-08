'use strict';

angular.module('app.exchange').config(ExchangeRoute);

ExchangeRoute.$inject = ['$routeProvider'];
/* @ngInject */
function ExchangeRoute($routeProvider) {

    $routeProvider.when('/exchange', {
        controller: 'ExchangeController',
        templateUrl: 'exchange/exchange.html',
        title: 'Exchange Items'
    });
    
}
