(function() {
    'use strict';

    angular.module('app.exchange', [
        'ui.select', 'ngResource',
    ]);
    
    require('./exchange.service');
    require('./exchange.controller');
    require('./exchange.routes');
    
})();

