require('./pickUpNumbers');

angular.module('viewCustom').controller('prmRequestsAfterController', [
  '$scope',
  '$element',
  'pickUpNumbers',
  function($scope, $element, pickUpNumbers) {
    var ctrl = this;

    ctrl.selector = function(element) {
      return element.querySelectorAll('p[ng-if="::requestDisplay.secondLineRight"]');
    }

    ctrl.$onInit = function() {
      ctrl.parentElement = $element.parent()[0];
    }

    $scope.$watch(angular.bind(ctrl, function() {
      return ctrl.parentElement.querySelector('p[ng-if="::requestDisplay.secondLineRight"]');
    }), function(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        pickUpNumbers.insertPickUpNumbers(ctrl.parentElement, ctrl.parentCtrl.requestsService.requestsDisplay, ctrl.selector);
      }
    });
  }
]);

angular.module('viewCustom').component('prmRequestsAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmRequestsAfterController',
});