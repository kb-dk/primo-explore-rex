angular.module('viewCustom').factory('announcement', ['$translate', '$mdToast', function($translate, $mdToast) {

  return {
    // Function to be called to display the announcement.
    // topbarElement is the DOM element to be shifted down when the announcement is active.
    display: function(topbarElement) {

      $translate('nui.message.announcement')
        .then(function(translatedValue) {
          // Check if there is an announcement to be displayed.
          // translatedValue is initialized to 'announcement' in the absence of a matching entry.

          if (translatedValue !== 'announcement' && translatedValue !== '' && translatedValue !== '&nbsp;') {
            // If so, display
            $mdToast.show({
              // Timeout duration in msecs. false implies no timeout.
              hideDelay: false,
              position: 'top',
              controller: 'announcementController',
              templateUrl: 'custom/' + globalViewName + '/html/announcement.html',
            }).then(unshiftTopbar).catch(unshiftTopbar);

            // Shift the topbar down to avoid overlapping.
            topbarElement.addClass('shifted-topbar');

            // Shift the topbar back into its original position.
            function unshiftTopbar() {
              return topbarElement.removeClass('shifted-topbar');
            }

          }
        });
    }
  }
}]);

angular.module('viewCustom').controller('announcementController', ['$scope', '$mdToast', function($scope, $mdToast) {
  var ctrl = $scope.ctrl = this;

  ctrl.close = function() {
    // Hide the announcement.
    $mdToast.hide();
  };

}]);