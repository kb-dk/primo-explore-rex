angular.module('viewCustom').controller('prmRequestsAfterController', ['$scope', 'pickUpNumbers', function ($scope, pickUpNumbers) {
  var ctrl = this;
  
  console.log('Making sure the changes are in place!');

  $scope.$watch(angular.bind(ctrl, function () {
    // console.log(ctrl.parentCtrl.requestsDisplay.pickUpNumbersInserted);
    return ctrl.parentCtrl.requestsDisplay.pickUpNumbersInserted;
  }), function (newVal, oldVal) {
      if(!newVal) {
        console.log(ctrl.parentCtrl.requestsDisplay.pickUpNumbersInserted);
        pickUpNumbers.insertPickUpNumbers(ctrl.parentCtrl.requestsDisplay);     
      }
  });

}]);
  
angular.module('viewCustom').component('prmRequestsAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmRequestsAfterController',
});