(function() {
    'use strict';

    angular.module('app.auth', [
    	'LocalStorageModule'
    	
        ]);
    
    require('./auth.service');
    require('./auth.controller');
//    require('./auth.routes');
    
})();