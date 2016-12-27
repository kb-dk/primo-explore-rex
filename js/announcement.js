/**
 * Annoncement service.
 * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
 */
angular.module('viewCustom').factory('announcement', [
  '$translate',
  '$mdToast',
  '$rootScope',
  function($translate, $mdToast, $rootScope) {

    return {
      /** 
       *  Displays the announcement if it has not been dismissed.
       *  @param {Angular.element} topbarElement - The element to be shifted down when the announcement is active.
       */
      display: function(topbarElement) {

        if ($rootScope.announcementDismissed == true) return;

        $translate('nui.message.announcement')
          .then(function(translatedValue) {
            // Check if there is an announcement to be displayed.
            // translatedValue is initialized to 'announcement' in the absence of a matching entry.
            if (translatedValue !== 'announcement' &&
              translatedValue !== '' && translatedValue !== '&nbsp;') {
              // If so, display
              $mdToast.show({
                // Timeout duration in msecs. false implies no timeout.
                hideDelay: false,
                position: 'top',
                controller: 'announcementController',
                templateUrl: 'custom/' + $rootScope.globalViewName + '/html/announcement.html',
              }).then(dismissed).catch(cancelled);

              // Shift the topbar down to avoid overlapping.
              topbarElement.addClass('shifted-topbar');

              // The announcement has been dismissed by the user.
              // Should not be displayed again.
              // Shift the topbar back into its original position and note that it was dismissed.
              function dismissed() {
                $rootScope.announcementDismissed = true;
                shiftTopbarBackUp();
              }

              // The announcement has been removed witout dismissal.
              // (Probably through navigation).
              // Shift the topbar back into its original position.
              function cancelled() {
                shiftTopbarBackUp();
              }

              function shiftTopbarBackUp() {
                topbarElement.removeClass('shifted-topbar');
              }

            }
          });
      }
    }
  }
]);

angular.module('viewCustom').controller('announcementController', ['$scope', '$mdToast', function($scope, $mdToast) {
  var ctrl = $scope.ctrl = this;

  /**
   * Dismiss the announcement.
   */
  ctrl.close = function() {
    $mdToast.hide();
  };

}]);