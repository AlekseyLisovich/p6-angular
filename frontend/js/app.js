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
                template: '<phone-detail></phone-detail>'
            }).
            otherwise('/phones');
        }
    ]);

angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/static/views/components/phones-list/phone-list.template.html','<div class="container-fluid">\r\n  <div class="row">\r\n    <div class="col-md-2">\r\n      <!--Sidebar content-->\r\n\r\n      <p>\r\n        Search:\r\n        <input ng-model="$ctrl.query" />\r\n      </p>\r\n\r\n      <p>\r\n        Sort by:\r\n        <select ng-model="$ctrl.orderProp">\r\n          <option value="name">Alphabetical</option>\r\n          <option value="age">Newest</option>\r\n        </select>\r\n      </p>\r\n\r\n    </div>\r\n    <div class="col-md-10">\r\n      <!--Body content-->\r\n\r\n      <div id="wrapper">\r\n        <div class="section" ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp" >\r\n           <div class="col s12 m7">\r\n    <div class="card horizontal">\r\n      <div class="card-image">\r\n        <a href="#/phones/{{phone.id}}">\r\n          <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />\r\n        </a>\r\n          </div>\r\n              <div class="card-stacked">\r\n              <div class="card-content">\r\n                <a href="#/phones/{{phone.id}}">{{phone.name}}</a>\r\n                <p>{{phone.snippet}}</p>\r\n              </div>\r\n                <div class="card-action">\r\n                  <a href="#">More details</a>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n');}]);
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

'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.module('phonesList', []).component('phonesList', {
    templateUrl: '/partials/components/phones-list/phone-list.template.html',
    controller: ['$http', function PhoneListController($http) {
        var self = this;
        self.orderProp = 'age';

        $http.get('data/phone/phones.json').then(function(response) {
            self.phones = response.data;
        });
    }]
});


//# sourceMappingURL=app.js.map
