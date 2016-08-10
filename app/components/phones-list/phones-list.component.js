'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('phonesList', []).component('phonesList', {
    templateUrl: '/partials/components/phones-list/phones-list.template.html',
    controller: ['$http', function PhoneListController($http) {
        var self = this;
        self.orderProp = 'age';

        $http.get('data/phone/phones.json').then(function(response) {
            self.phones = response.data;
        });
    }]
});
