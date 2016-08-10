'use strict';

// Define the `phonecatApp` module
angular.module('phonesApp', [
        'ngRoute',
        'phoneDetails',
        'phonesList',
    ])
    .config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
            when('/phones', {
                template: '<phones-list></phone-list>'
            }).
            when('/phones/:phoneId', {
                template: '<phone-details></phone-details>'
            }).
             otherwise('/phones');
        }
    ]);
