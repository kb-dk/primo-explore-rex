angular.module('viewCustom').controller('prmTopbarAfterController', ['$scope', '$mdToast', '$translate', '$element', function($scope, $mdToast, $translate, $element) {
  var ctrl = this;

  ctrl.$onInit = function() {

    // $translate('nui.message.announcement')
    //   .then(function(translatedValue) {
    //     // Check if there is a message to be displayed with the info bar.
    //     // translatedValue is initialized to 'announcement' in the absence of a matching entry. '
    //     if (translatedValue !== 'announcement') {
    //       // If so, display
    //       $mdToast.show({
    //         // Timeout duration in msecs. false implies no timeout.
    //         hideDelay: false, 
    //         position: 'top',
    //         controller: 'infoBarController',
    //         templateUrl: 'custom/' + globalViewName + '/html/infoBar.html'
    //       }).then(shiftTopBarUp).catch(shiftTopBarUp);
        
    //       // Shift the topbar down to avoid overlapping.
    //       $element.parent().addClass('shifted-topbar');

    //     }
    //   });

  };

  // Shift the topbar back into its original position.
  function shiftTopBarUp() {
    return $element.parent().removeClass('shifted-topbar');
  }

}]);

angular.module('viewCustom').component('prmTopbarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmTopbarAfterController',
});