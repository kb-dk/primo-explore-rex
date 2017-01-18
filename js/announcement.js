/**
 * Annoncement service.
 * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
 */
angular.module('viewCustom').factory('announcement', [
  '$translate',
  '$mdToast',
  '$rootScope',
  ($translate, $mdToast, $rootScope) => {

    let toastPromise;
    let dismissed = false;

    // The announcement has been dismissed.
    let dismiss = () => {
      dismissed = true;
      toastPromise = null;
    };

    let display = (hideCallback) => {
      return new Promise((resolve, reject) => {

        if (dismissed === true) {
          reject('The announcement has been dismissed.');
          return;
        };

        $translate('nui.message.announcement').then((translation) => {
          // If there is no announcement to be displayed.
          if ((!translation) || ['announcement', '&nbsp;', ''].includes(translation)) {
            // translation is initialized to 'announcement' in the absence of a matching entry.

            // If there is already a toast, and no 
            // announcement, hide the toast.
            // This happens when the language is changed.
            if (toastPromise && !dismissed) {
              console.log('I happen!');
              $mdToast.hide();
            }
            reject('No announcement found.');
            return;
          }

          // If there is already a toast promise,
          // avoid creating a new one.
          toastPromise = toastPromise || $mdToast.show({
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
          });

          toastPromise.then(hideCallback).catch(hideCallback).then(dismiss);

          resolve();

        });

      });
    };

    // Forget the dismissal if the language is changed.
    $rootScope.$on('$translateChangeSuccess', () => {
      dismissed = false;
    });

    return {
      /** 
       *  Displays the announcement if it has not been dismissed.
       *  @param {function} [hideCallback] - A function to be called 
       *    when the announcement is hidden.
       *  @return {Promise} A Promise to be fulfilled 
       *    if the announcement is displayed, and to be 
       *    rejected when the announcement cannot be displayed.
       */
      display: display,
    }

  }
]);