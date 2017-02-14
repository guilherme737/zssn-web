'use strict';

angular.module('app', [
    'ngAnimate',    
    'ui.router',
    'ngSanitize',
    'ngBootbox',
    'uiGmapgoogle-maps',    
    'LocalStorageModule',    
    'app.auth',
    'app.home',
    'app.people',
    'app.exchange'
]);

require('./app.config');
require('./app.run');
//require('./alertify.config');

require('./services/http.factory');
require('./components/somente-numeros.directive');


setTimeout(function () {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
}, 500);

