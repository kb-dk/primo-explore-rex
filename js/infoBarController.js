angular.module('viewCustom').controller('infoBarController', ['$scope', '$mdToast', '$document', function($scope, $mdToast, $document) {
  var ctrl = $scope.ctrl = this;

  ctrl.close = function() {
    // Hide the info bar.
    $mdToast.hide();
  };

}]);