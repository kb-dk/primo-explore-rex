angular.module('viewCustom').controller('prmTopbarAfterController', ['$scope', '$mdToast', '$translate', '$document', function($scope, $mdToast, $translate, $document) {
  var ctrl = this;

  ctrl.$onInit = function() {

    $translate('nui.message.dismiss')
      .then(function(translatedValue) {

        // Check if there is a message to be displayed with the info bar
        if (translatedValue !== "dismiss") {
          // If so, display
          $mdToast.show({
            hideDelay: 100000,
            position: 'top',
            controller: 'infoBarController',
            templateUrl: 'custom/' + globalViewName + '/html/infoBar.html'
          }).then(shiftTopBarUp).catch(shiftTopBarUp);
        
          // Shift the topbar down to avoid overlap.
          $document.find('prm-topbar').addClass('shifted-topbar');

        }
      });

  };

  // Shift the topbar back into its original position.
  function shiftTopBarUp() {
    return angular.element(document).find('prm-topbar').removeClass('shifted-topbar');
  }



}]);

angular.module('viewCustom').component('prmTopbarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmTopbarAfterController',
});