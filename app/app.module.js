'use strict';

angular.module('app', [
    'ngAnimate',    
    'ui.router',
    'ngSanitize',
//    require('angular-sanitize'),
    'ngBootbox',
    'uiGmapgoogle-maps',    
    'LocalStorageModule',    
    'app.auth',
    'app.home',
    'app.people',
    'app.exchange'
]);

//angular.module('app').constant('CONTEXT', 'api');

require('./app.config');
require('./app.run');
require('./alertify.config');
//require('./services/enum.factory');
require('./services/http.factory');
require('./components/somente-numeros.directive');


setTimeout(function () {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
}, 500);

