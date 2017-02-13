'use strict';

angular.module('app').config(AppRoute);

AppRoute.$inject = ['$stateProvider', '$urlRouterProvider','$httpProvider', 'uiGmapGoogleMapApiProvider'];
/* @ngInject */
function AppRoute($stateProvider, $urlRouterProvider, $httpProvider, GoogleMapApi) {
    
    $urlRouterProvider.otherwise('/home');
    
    /*
    $routeProvider.when('/', {
        templateUrl: 'home/home.html',
        title: 'Home'
    });
    $routeProvider.when('/pagenotfound', {
        templateUrl: 'pagenotfound.html',
        title: '404'
    });
    $routeProvider.otherwise({redirectTo: '/pagenotfound'});
    */

    $httpProvider.interceptors.push(['$q', 'HttpService', function ($q, HttpService) {
        return {
            request: function (config) {
                if (config.method == 'GET') {
                    var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                    config.url = config.url + separator + 'noCache=' + new Date().getTime();
                }
                HttpService.pushRequest();
                return config;
            },

            requestError: function (response) {
                HttpService.popRequest();
                return $q.reject(response);
            },

            response: function (response) {
                HttpService.popRequest();
                return response;
            },

            responseError: function (response) {
                HttpService.popRequest();
                if (response.status === 502) {
                    //Flash.create('danger', 'Servidor indisponível no momento!');
                } else if (response.status !== 401) {
                    //Flash.create('danger', response.data.messages);
                }
                return $q.reject(response);
            }
        };
    }]);

    //paginationTemplateProvider.setPath('node_modules/angular-utils-pagination/dirPagination.tpl.html');

    GoogleMapApi.configure({
          key: 'AIzaSyCkd3Kf6BWYxxmQaKUU2OTRUOzmhvU3bSc',
            //v: '3.20',
    libraries: 'weather,geometry,visualization'
  });
}
