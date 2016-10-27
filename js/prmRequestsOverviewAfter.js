angular.module('viewCustom').controller('prmRequestsOverviewAfterController', ['$scope', '$element', 'pickUpNumbers', function ($scope, $element, pickUpNumbers) {
  var ctrl = this;
  
  ctrl.selector = function (element) {
    return element.getElementsByTagName('span');
  }
  
  ctrl.$onInit = function () {
    ctrl.parentElement = $element.parent()[0];
  }

  $scope.$watch(angular.bind(ctrl, function () {
    return ctrl.parentElement.querySelector('p[ng-if="::request.secondLineRight"]');
  }), function (newVal, oldVal) {
      if(newVal && newVal !== oldVal) {
        pickUpNumbers.insertPickUpNumbers(ctrl.parentElement, ctrl.parentCtrl.requestsService.requestsDisplay, ctrl.selector);
      }
  });


}]);
  
angular.module('viewCustom').component('prmRequestsOverviewAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmRequestsOverviewAfterController',
});