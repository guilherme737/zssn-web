'use strict';

angular.module('app.people').controller('PeopleController', PeopleController);

PeopleController.$inject = ['$scope', '$state', '$location', '$http', '$timeout', '$log', 'PeopleService', 'AuthService', 'uiGmapGoogleMapApi', '$ngBootbox'];
/* @ngInject */
function PeopleController($scope, $state, $location, $http, $timeout, $log, People, Auth, uiGmapGoogleMapApi, $ngBootbox) {

    $scope.person = {
        name: "",
        age: 0,
        gender: "",
        lonlat: null,
        items: ""
    }


    $scope.items = [
        {name: 'Water', count: 0},
        {name: 'Food', count: 0},
        {name: 'Medication', count: 0},
        {name: 'Ammunition', count: 0}
    ];

    $scope.save = function () {

        var items = "";

        angular.forEach($scope.items, function (value, key) {
            items += value.name + ":" + value.count + ";";
        });

        $scope.person.items = items;

        People.save($scope.person).then(function (data) {

            if (!data.message) {

                Auth.setAuth(data);
                
                $window.location.reload();
            }
        });
    };

    /** Report Infection Operations **/

    $scope.person = {};

    People.getAll().then(function (persons) {
        $scope.persons = persons;
    });

    $scope.setInfected = function (data) {

        if (data.infected != null) {

            var id = data.infected.location.replace('http://zssn-backend-example.herokuapp.com/api/people/', '');

            People.setInfected(id).then(function (response) {
                
                if (response) {
                    
                    $ngBootbox.alert('Survivor already reported by you.');
                    
                } else {
                    
                    $ngBootbox.alert('Survivor reported successfully.');                    
                }
                
            });
        }
        //Se esqueceu de escolher o sobrevivente infectado, exibe o alerta
        else {
            
            $ngBootbox.alert('Select a survivor!');            
        }
    }


    uiGmapGoogleMapApi.then(function (maps) {

    });

    $scope.map = {
        center: {
            latitude: -16,
            longitude: -49
        },
        zoom: 5
    };

    //$scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };

    $scope.options = {scrollwheel: false};

    $scope.coordsUpdates = 0;

    $scope.dynamicMoveCtr = 0;

    $scope.marker = {
        id: 0,
        coords: {
            latitude: -16.1451,
            longitude: -49.6680
        },
        options: {draggable: true},
        events: {
            dragend: function (marker, eventName, args) {
                $log.log('marker dragend');
                var lat = marker.getPosition().lat();
                var lon = marker.getPosition().lng();
                $log.log(lat);
                $log.log(lon);

                //$scope.people.latitude = lat;
                //$scope.people.longitude = lon;

                $scope.person.lonlat = "point (" + lon + "," + lat + ")";

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };

    $scope.$watchCollection("marker.coords", function (newVal, oldVal) {

        if (_.isEqual(newVal, oldVal))
            return;

        $scope.coordsUpdates++;

    });

    $timeout(function () {

        $scope.marker.coords = {
            latitude: -16.1451,
            longitude: -49.6680
        };

        $scope.dynamicMoveCtr++;

        $timeout(function () {

            $scope.marker.coords = {
                latitude: -16.1451,
                longitude: -49.6680
            };

            $scope.dynamicMoveCtr++;

        }, 2000);

    }, 1000);

    /*
     $scope.people = {
     latitude: $scope.marker.coords.latitude,
     longitude: $scope.marker.coords.longitude
     };
     */

}