angular.module('viewCustom').controller('prmRequestsAfterController', ['$scope', 'pickUpNumbers', function ($scope, pickUpNumbers) {
  var ctrl = this;

  // Watching the boolean property representing if the pick-up numbers have been inserted into the view. 
  $scope.$watch(angular.bind(ctrl, function () {
    return ctrl.parentCtrl.requestsDisplay.pickUpNumbersInserted;
  }), function (newVal, oldVal) {
      if(!newVal) {
        // If not, insert them.
        pickUpNumbers.insertPickUpNumbers(ctrl.parentCtrl.requestsDisplay);     
      }
  });

}]);
  
angular.module('viewCustom').component('prmRequestsAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmRequestsAfterController',
});