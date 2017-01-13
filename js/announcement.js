/**
 * Annoncement service.
 * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
 */
angular.module('viewCustom').factory('announcement', [
  '$translate',
  '$mdToast',
  '$rootScope',
  ($translate, $mdToast, $rootScope) => {

    let toast;

    // The announcement has been dismissed by the user,
    // and should not be displayed again.
    let dismiss = () => {
      $rootScope.announcementDismissed = true;
    };

    /** 
     *  Displays the announcement if it has not been dismissed.
     *  @param {function} [hideCallback] - A function to be called 
     *    when the announcement is hidden.
     *  @return {Promise} A Promise to be fulfilled 
     *    if the announcement is displayed, and to be 
     *    rejected when the announcement cannot be displayed.
     */
    let display = (hideCallback) => {
      return new Promise((resolve, reject) => {

        if ($rootScope.announcementDismissed === true) {
          reject('The announcement has been dismissed.');
          return;
        };

        $translate('nui.message.announcement').then((translation) => {
          // Check if there is an announcement to be displayed.
          // translation is initialized to 'announcement' in the absence of a matching entry.
          if ((!translation) || ['announcement', '&nbsp;', ''].includes(translation)) {
            // If there is already a toast, and no 
            // announcement is found, hide the toast.
            // This happens when the language is changed.
            if (toast) {
              $mdToast.hide();
            }
            reject('No announcement found.');
          } else {
            // If so, display
            // console.log('Show me what you got.');
            toast = $mdToast.show({
              // Timeout duration in msecs. false implies no timeout.
              hideDelay: false,
              position: 'top',
              controller: () => {
                return {
                  close: () => {
                    $mdToast.hide();
                  }
                }
              },
              controllerAs: '$ctrl',
              templateUrl: 'custom/' + $rootScope.globalViewName + '/html/announcement.html',
            }).then(dismiss).then(hideCallback).catch(hideCallback);

            resolve();
          }
        });

      });
    };

    // Forget the dismissal if the language is changed.
    $rootScope.$on('$translateChangeSuccess', () => {
      $rootScope.announcementDismissed = false;
    });

    return {
      display: display,
    }

  }
]); 