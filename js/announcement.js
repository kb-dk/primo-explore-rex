/**
 * Annoncement service.
 * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
 */
angular.module('viewCustom').factory('announcement', [
  '$translate',
  '$mdToast',
  '$rootScope',
  function($translate, $mdToast, $rootScope) {

    // The announcement has been dismissed by the user,
    // and should not be displayed again.
    function dismissed() {
      $rootScope.announcementDismissed = true;
    };

    return {
      /** 
       *  Displays the announcement if it has not been dismissed.
       *  @param {function} [hideCallback] - A function to be called when the announcement is hidden.
       *  @return {Promise} A Promise to be fulfilled if the announcement is displayed, 
       *  and to be rejected when the announcement cannot be displayed.
       */
      display: function(hideCallback) {
        return new Promise(function(resolve, reject) {

          if ($rootScope.announcementDismissed == true) {
            return reject('The announcement has been dismissed.');
          };

          $translate('nui.message.announcement').then(function(translation) {
            // Check if there is an announcement to be displayed.
            // translation is initialized to 'announcement' in the absence of a matching entry.
            if ((!translation) || ['announcement', '&nbsp;', ''].includes(translation)) {
            // if (false) {
              reject();
            } else {
              // If so, display
              $mdToast.show({
                // Timeout duration in msecs. false implies no timeout.
                hideDelay: false,
                position: 'top',
                controller: 'announcementController',
                templateUrl: 'custom/' + $rootScope.globalViewName + '/html/announcement.html',
              }).then(dismissed).then(hideCallback).catch(hideCallback);

              resolve();
            }
          });

        });
      },
    }

  }
]);


/**
 * Announcement controller.
 */
angular.module('viewCustom').controller('announcementController', ['$scope', '$mdToast', function($scope, $mdToast) {
  var ctrl = $scope.ctrl = this;

  /**
   * Dismiss the announcement.
   */
  ctrl.close = function() {
    $mdToast.hide();
  };

}]);