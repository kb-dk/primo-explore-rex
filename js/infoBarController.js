angular.module('viewCustom').controller('infoBarController', ['$scope', '$mdToast', function($scope, $mdToast) {
  var ctrl = $scope.ctrl = this;
  
  ctrl.close = function() {
    // Hide the info bar.
    $mdToast.hide();
  };

}]);