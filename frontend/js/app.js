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

angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/static/views/components/phone-details/phone-details.template.html','<img ng-src="{{$ctrl.phone.images[0]}}" class="phone" />\r\n\r\n<h1>{{$ctrl.phone.name}}</h1>\r\n\r\n<p>{{$ctrl.phone.description}}</p>\r\n\r\n<ul class="phone-thumbs">\r\n  <li ng-repeat="img in $ctrl.phone.images">\r\n    <img ng-src="{{img}}" />\r\n  </li>\r\n</ul>\r\n\r\n<ul class="specs">\r\n  <li>\r\n    <span>Availability and Networks</span>\r\n    <dl>\r\n      <dt>Availability</dt>\r\n      <dd ng-repeat="availability in $ctrl.phone.availability">{{availability}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Battery</span>\r\n    <dl>\r\n      <dt>Type</dt>\r\n      <dd>{{$ctrl.phone.battery.type}}</dd>\r\n      <dt>Talk Time</dt>\r\n      <dd>{{$ctrl.phone.battery.talkTime}}</dd>\r\n      <dt>Standby time (max)</dt>\r\n      <dd>{{$ctrl.phone.battery.standbyTime}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Storage and Memory</span>\r\n    <dl>\r\n      <dt>RAM</dt>\r\n      <dd>{{$ctrl.phone.storage.ram}}</dd>\r\n      <dt>Internal Storage</dt>\r\n      <dd>{{$ctrl.phone.storage.flash}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Connectivity</span>\r\n    <dl>\r\n      <dt>Network Support</dt>\r\n      <dd>{{$ctrl.phone.connectivity.cell}}</dd>\r\n      <dt>WiFi</dt>\r\n      <dd>{{$ctrl.phone.connectivity.wifi}}</dd>\r\n      <dt>Bluetooth</dt>\r\n      <dd>{{$ctrl.phone.connectivity.bluetooth}}</dd>\r\n      <dt>Infrared</dt>\r\n      <dd>{{$ctrl.phone.connectivity.infrared}}</dd>\r\n      <dt>GPS</dt>\r\n      <dd>{{$ctrl.phone.connectivity.gps}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Android</span>\r\n    <dl>\r\n      <dt>OS Version</dt>\r\n      <dd>{{$ctrl.phone.android.os}}</dd>\r\n      <dt>UI</dt>\r\n      <dd>{{$ctrl.phone.android.ui}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Size and Weight</span>\r\n    <dl>\r\n      <dt>Dimensions</dt>\r\n      <dd ng-repeat="dim in $ctrl.phone.sizeAndWeight.dimensions">{{dim}}</dd>\r\n      <dt>Weight</dt>\r\n      <dd>{{$ctrl.phone.sizeAndWeight.weight}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Display</span>\r\n    <dl>\r\n      <dt>Screen size</dt>\r\n      <dd>{{$ctrl.phone.display.screenSize}}</dd>\r\n      <dt>Screen resolution</dt>\r\n      <dd>{{$ctrl.phone.display.screenResolution}}</dd>\r\n      <dt>Touch screen</dt>\r\n      <dd>{{$ctrl.phone.display.touchScreen}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Hardware</span>\r\n    <dl>\r\n      <dt>CPU</dt>\r\n      <dd>{{$ctrl.phone.hardware.cpu}}</dd>\r\n      <dt>USB</dt>\r\n      <dd>{{$ctrl.phone.hardware.usb}}</dd>\r\n      <dt>Audio / headphone jack</dt>\r\n      <dd>{{$ctrl.phone.hardware.audioJack}}</dd>\r\n      <dt>FM Radio</dt>\r\n      <dd>{{$ctrl.phone.hardware.fmRadio}}</dd>\r\n      <dt>Accelerometer</dt>\r\n      <dd>{{$ctrl.phone.hardware.accelerometer}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Camera</span>\r\n    <dl>\r\n      <dt>Primary</dt>\r\n      <dd>{{$ctrl.phone.camera.primary}}</dd>\r\n      <dt>Features</dt>\r\n      <dd>{{$ctrl.phone.camera.features.join(\', \')}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Additional Features</span>\r\n    <dd>{{$ctrl.phone.additionalFeatures}}</dd>\r\n  </li>\r\n</ul>\r\n');
$templateCache.put('/static/views/components/phones-list/phones-list.template.html','<div>\r\n<div class="container-fluid">\r\n    <div class="row">\r\n        <div class="col-md-2">\r\n            <p>\r\n                <div class = "searchLabel">Search:</div>\r\n                <div class = "searchInput"><input ng-model="$ctrl.query" /></div>\r\n            </p>\r\n        </div>\r\n\r\n        <div class="col-md-10">\r\n            <!--Body content-->\r\n            <div id="wrapper">\r\n                <div class="section" ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp">\r\n                    <div class="col s12 m7">\r\n                        <div class="card horizontal">\r\n                            <div class="card-image">\r\n                                <a href="#!/phones/{{phone.id}}">\r\n                                    <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />\r\n                                </a>\r\n                            </div>\r\n                            <div class="card-stacked">\r\n                                <div class="card-content">\r\n                                    <a ng-href="#!/phones/{{phone.id}}">{{phone.name}}</a>\r\n                                    <p>{{phone.snippet}}</p>\r\n                                </div>\r\n                                <<div class="card-action">\r\n                                    <a href="#">More details</a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n</div>\r\n</div>\r\n</div>\r\n\r\n\r\n\r\n    </div>\r\n</div>\r\n');}]);

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

//# sourceMappingURL=app.js.map
