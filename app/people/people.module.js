'use strict';

angular.module('app.people', [
    'ngResource',
    'ngRoute'        
]);

require('./people.factory');
require('./people.controller');
require('./people.routes');