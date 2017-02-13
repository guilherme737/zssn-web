'use strict';

angular.module('app.home').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$state', '$location', '$http', '$filter','HomeService', "AuthService"];
/* @ngInject */
function HomeController($scope, $state, $location, $http, $filter, HomeService, AuthService) {

    
    if ( !AuthService.isAuth() ) {
        
        $state.go("people/new");
    }
    
    HomeService.getAverageInfectedPeople().then(function (data) {
        $scope.averageInfectedPeople = $filter('number')(data.report.average_infected * 100, 2) + '%';
    });
    
    HomeService.getAverageNonInfectedPeople().then(function (data) {
        $scope.averageNonInfectedPeople = $filter('number')(data.report.average_healthy * 100, 2) + '%';
    });
    
    HomeService.getAverageQuantityItemByPerson().then(function (data) {
        $scope.averageQuantityItemByPerson = $filter('number')(data.report.average_items_quantity_per_person, 2);
        $scope.averageQuantityItemByPersonNonInfected = $filter('number')(data.report.average_items_quantity_per_healthy_person, 2);
    });
    
    HomeService.getTotalLostPoints().then(function (data) {
        $scope.totalLostPoints = data.report.total_points_lost;
    });

}