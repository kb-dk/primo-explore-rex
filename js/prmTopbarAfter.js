angular.module('viewCustom').controller('prmTopbarAfterController', ['$scope', '$mdToast', '$translate', '$document', function($scope, $mdToast, $translate, $document) {
  var ctrl = this;

  ctrl.$onInit = function() {
    
    $translate('nui.message.dismiss')
      .then(function(translatedValue) {
        
        // Check if there is a message to be displayed with the info bar
        if (translatedValue !== "dismiss") {
          // If so, display
          $mdToast.show({
            hideDelay: 300000,
            position: 'top',
            controller: 'infoBarController',
            templateUrl: 'custom/' + globalViewName + '/html/infoBar.html'
          });

          // Shift the topbar below to avoid it to be hidden by the info bar.
          $document.find('prm-topbar').addClass('shifted-topbar');
        }
      });

  };

}]);

angular.module('viewCustom').component('prmTopbarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmTopbarAfterController',
});