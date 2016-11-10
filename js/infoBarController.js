angular.module('viewCustom').controller('infoBarController', ['$scope', '$mdToast', '$document', function($scope, $mdToast, $document) {
  var ctrl = $scope.ctrl = this;


  ctrl.close = function() {
    // Hide the info bar.
    $mdToast.hide();

    // Shift the topbar back into its original position.
    // TODO: This should be done when the info bar is closed through other means, 
    // such as swiping to the side or waiting.
    angular.element(document).find('prm-topbar').removeClass('shifted-topbar');
  };

}]);