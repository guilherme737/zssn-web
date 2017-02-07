'use strict';

angular.module('app.home', [
    'ngResource',
    'ngRoute'        
]);

require('./home.factory');
require('./home.controller');
require('./home.routes');