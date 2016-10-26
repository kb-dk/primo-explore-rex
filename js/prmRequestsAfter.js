angular.module('viewCustom').controller('prmRequestsAfterController', ['$scope', 'pickUpNumbers', function ($scope, pickUpNumbers) {
  var ctrl = this;

  $scope.$watch(angular.bind(ctrl, function () {
    return ctrl.parentCtrl.requestsDisplay.pickUpNumbersInserted;
  }), function (newVal, oldVal) {
      if(!newVal) {
        // console.log(ctrl.parentCtrl.requestsDisplay.pickUpNumbersInserted);
        pickUpNumbers.insertPickUpNumbers(ctrl.parentCtrl.requestsDisplay);     
      }
  });

}]);
  
angular.module('viewCustom').component('prmRequestsAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmRequestsAfterController',
});