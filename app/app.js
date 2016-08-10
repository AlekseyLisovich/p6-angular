'use strict';

// Define the `phonecatApp` module
var app = angular.module('phonesApp', [
        'ngRoute',
        'phoneDetails',
        'phonesList',
    ]);
    app.config(['$locationProvider', '$routeProvider',
        function config($locationProvider, $routeProvider) {
            $locationProvider.hashPrefix('!');

            $routeProvider.
            when('/', {
                template: 'user-login.html'
            }).
            when('/dashboard', {
                template: 'dashboard.html'
            }).
            when('/phones', {
                template: '<phones-list></phone-list>'
            }).
            when('/phones/:phoneId', {
                template: '<phone-details></phone-details>'
            }).
            when('/phones/1', {
                template: '<phone-details></phone-details>'
            }).
             otherwise('/phones');
        }
    ]);

app.controller('loginCtrl', function($scope, $location){
  $scope.submit =  function(){
    var uname = $scope.username;
    var password = $scope.password;
    if($scope.username == 'admin' && $scope.password == 'admin'){
      $location.path('dashboard');
    }
  }
}
