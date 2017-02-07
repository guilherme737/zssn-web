'use strict';

angular.module('app', [
    'ngAnimate',
    'uiGmapgoogle-maps',
    'angularUtils.directives.dirPagination',
    'app.people'    
]);

angular.module('app').constant('CONTEXT', 'api');

require('./app.config');
require('./app.run');
require('./alertify.config');
require('./services/enum.factory');
require('./services/http.factory');
require('./components/somente-numeros.directive');


setTimeout(function () {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });
}, 500);

