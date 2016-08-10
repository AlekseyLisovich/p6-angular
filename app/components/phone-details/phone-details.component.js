'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.module('phoneDetails', []).component('phoneDetails', {
    template: 'TBD: Detail view for <span>{{$ctrl.phoneId}}</span>',
    controller: ['$routeParams',
        function PhoneDetailsController($routeParams) {
            this.phoneId = $routeParams.phoneId;
        }
    ]
});
