'use strict';

angular.module('app.exchange').config(ExchangeRoute);

ExchangeRoute.$inject = ['$stateProvider'];
/* @ngInject */
function ExchangeRoute($stateProvider) {

    $stateProvider.state('exchange',{
        //name : 'exchange',
        controller: 'ExchangeController',
        templateUrl: 'exchange/exchange.html',
        title: 'Exchange Items'
    });
    
}
