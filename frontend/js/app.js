'use strict';

// Define the `phonecatApp` module
angular.module('phonecatApp', [
  'ngRoute',
  'phoneDetail',
  'phoneList',
]);

//fetchPhones
//....

'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular
    .module('phonecatApp')
    .component('phoneDetail', {
        templateUrl: 'app/phone/components/phone-detail/phone-detail.template.html',
        controller: ['$http', '$routeParams',
            function PhoneDetailController($http, $routeParams) {
                var self = this;

                $http.get('app/phone/components/phones/phones' + $routeParams.phoneId + '.json').then(function(response) {
                    self.phone = response.data;
                });
            }
        ]
    });

angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('/static/views/phone/components/phone-detail/phone-detail.template.html','<div class="phone-images">\r\n  <img ng-src="{{img}}" class="phone"\r\n      ng-class="{selected: img === $ctrl.mainImageUrl}"\r\n      ng-repeat="img in $ctrl.phone.images" />\r\n</div>\r\n\r\n<h1>{{$ctrl.phone.name}}</h1>\r\n\r\n<p>{{$ctrl.phone.description}}</p>\r\n\r\n<ul class="phone-thumbs">\r\n  <li ng-repeat="img in $ctrl.phone.images">\r\n    <img ng-src="{{img}}" ng-click="$ctrl.setImage(img)" />\r\n  </li>\r\n</ul>\r\n\r\n<ul class="specs">\r\n  <li>\r\n    <span>Availability and Networks</span>\r\n    <dl>\r\n      <dt>Availability</dt>\r\n      <dd ng-repeat="availability in $ctrl.phone.availability">{{availability}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Battery</span>\r\n    <dl>\r\n      <dt>Type</dt>\r\n      <dd>{{$ctrl.phone.battery.type}}</dd>\r\n      <dt>Talk Time</dt>\r\n      <dd>{{$ctrl.phone.battery.talkTime}}</dd>\r\n      <dt>Standby time (max)</dt>\r\n      <dd>{{$ctrl.phone.battery.standbyTime}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Storage and Memory</span>\r\n    <dl>\r\n      <dt>RAM</dt>\r\n      <dd>{{$ctrl.phone.storage.ram}}</dd>\r\n      <dt>Internal Storage</dt>\r\n      <dd>{{$ctrl.phone.storage.flash}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Connectivity</span>\r\n    <dl>\r\n      <dt>Network Support</dt>\r\n      <dd>{{$ctrl.phone.connectivity.cell}}</dd>\r\n      <dt>WiFi</dt>\r\n      <dd>{{$ctrl.phone.connectivity.wifi}}</dd>\r\n      <dt>Bluetooth</dt>\r\n      <dd>{{$ctrl.phone.connectivity.bluetooth}}</dd>\r\n      <dt>Infrared</dt>\r\n      <dd>{{$ctrl.phone.connectivity.infrared | checkmark}}</dd>\r\n      <dt>GPS</dt>\r\n      <dd>{{$ctrl.phone.connectivity.gps | checkmark}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Android</span>\r\n    <dl>\r\n      <dt>OS Version</dt>\r\n      <dd>{{$ctrl.phone.android.os}}</dd>\r\n      <dt>UI</dt>\r\n      <dd>{{$ctrl.phone.android.ui}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Size and Weight</span>\r\n    <dl>\r\n      <dt>Dimensions</dt>\r\n      <dd ng-repeat="dim in $ctrl.phone.sizeAndWeight.dimensions">{{dim}}</dd>\r\n      <dt>Weight</dt>\r\n      <dd>{{$ctrl.phone.sizeAndWeight.weight}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Display</span>\r\n    <dl>\r\n      <dt>Screen size</dt>\r\n      <dd>{{$ctrl.phone.display.screenSize}}</dd>\r\n      <dt>Screen resolution</dt>\r\n      <dd>{{$ctrl.phone.display.screenResolution}}</dd>\r\n      <dt>Touch screen</dt>\r\n      <dd>{{$ctrl.phone.display.touchScreen | checkmark}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Hardware</span>\r\n    <dl>\r\n      <dt>CPU</dt>\r\n      <dd>{{$ctrl.phone.hardware.cpu}}</dd>\r\n      <dt>USB</dt>\r\n      <dd>{{$ctrl.phone.hardware.usb}}</dd>\r\n      <dt>Audio / headphone jack</dt>\r\n      <dd>{{$ctrl.phone.hardware.audioJack}}</dd>\r\n      <dt>FM Radio</dt>\r\n      <dd>{{$ctrl.phone.hardware.fmRadio | checkmark}}</dd>\r\n      <dt>Accelerometer</dt>\r\n      <dd>{{$ctrl.phone.hardware.accelerometer | checkmark}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Camera</span>\r\n    <dl>\r\n      <dt>Primary</dt>\r\n      <dd>{{$ctrl.phone.camera.primary}}</dd>\r\n      <dt>Features</dt>\r\n      <dd>{{$ctrl.phone.camera.features.join(\', \')}}</dd>\r\n    </dl>\r\n  </li>\r\n  <li>\r\n    <span>Additional Features</span>\r\n    <dd>{{$ctrl.phone.additionalFeatures}}</dd>\r\n  </li>\r\n</ul>\r\n');
$templateCache.put('/static/views/phone/components/phone-list/phone-list.template.html','<div class="container-fluid">\r\n  <div class="row">\r\n    <div class="col-md-2">\r\n      <!--Sidebar content-->\r\n\r\n      <p>\r\n        Search:\r\n        <input ng-model="$ctrl.query" />\r\n      </p>\r\n\r\n      <p>\r\n        Sort by:\r\n        <select ng-model="$ctrl.orderProp">\r\n          <option value="name">Alphabetical</option>\r\n          <option value="age">Newest</option>\r\n        </select>\r\n      </p>\r\n\r\n    </div>\r\n    <div class="col-md-10">\r\n      <!--Body content-->\r\n\r\n      <ul class="phones">\r\n        <li ng-repeat="phone in $ctrl.phones | filter:$ctrl.query | orderBy:$ctrl.orderProp" class="thumbnail">\r\n          <a href="#/phones/{{phone.id}}" class="thumb">\r\n            <img ng-src="{{phone.imageUrl}}" alt="{{phone.name}}" />\r\n          </a>\r\n          <a href="#/phones/{{phone.id}}">{{phone.name}}</a>\r\n          <p>{{phone.snippet}}</p>\r\n        </li>\r\n      </ul>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n');}]);
'use strict';

// Define the `phoneDetail` module
angular.module('phoneDetail', [
   'ngRoute',
  'core.phone'
]);

'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('phonecatApp').
  component('phoneList', {
    templateUrl: 'app/phone/components/phone-list/phone-list.template.html',
    controller: ['$http', function PhoneListController($http) {
      var self = this;
      self.orderProp = 'age';

      $http.get('app/phone/components/phones/phones.json').then(function(response) {
        self.phones = response.data;
      });
    }]
  });

'use strict';

// Define the `phoneList` module
angular.module('phoneList', []);

//# sourceMappingURL=app.js.map
