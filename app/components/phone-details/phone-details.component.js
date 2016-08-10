'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.module('phoneDetails', []).component('phoneDetails', {
    templateUrl: '/partials/components/phone-details/phone-details.template.html',
    controller: ['$http', '$routeParams',
      function PhoneDetailController($http, $routeParams) {
        var self = this;

        $http.get('data/phone/' + $routeParams.phoneId + '.json').then(function(response) {
          self.phone = response.data;
        });
      }
    ]
  });
