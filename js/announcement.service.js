import {
  viewName
} from './viewName';

/**
 * Annoncement service.
 * Displays a md-toast on top of the view, containing an announcement retrieved from the code tables.
 */
export class AnnouncementService {
  constructor($translate, $mdToast, $rootScope) {
    this.$translate = $translate;
    this.$mdToast = $mdToast;
    this.$rootScope = $rootScope;

    this._dismissed = false;

    // Forget the dismissal if the language is changed.
    this.$rootScope.$on('$translateChangeSuccess', () => {
      this._dismissed = false;
    });
  };

  // The announcement has been dismissed.
  _dismiss() {
    this._dismissed = true;
    this._toastPromise = null;
  };

  /** 
   *  Displays the announcement if it has not been dismissed.
   *  @param {function} [hideCallback] - A function to be called 
   *    when the announcement is hidden.
   *  @return {Promise} A Promise to be fulfilled 
   *    if the announcement is displayed, and to be 
   *    rejected when the announcement cannot be displayed.
   */
  display(hideCallback) {
    let ctrl = this;

    return new Promise((resolve, reject) => {

      if (ctrl._dismissed === true) {
        reject('The announcement has been dismissed.');
        return;
      };

      ctrl.$translate('nui.message.announcement').then((translation) => {
        // If there is no announcement to be displayed.
        if ((!translation) || ['announcement', '&nbsp;', ''].includes(translation)) {
          // translation is assigned 'announcement' in the absence of a matching entry.

          // If there is already a toast, and no 
          // announcement, hide the toast.
          // This happens when the language is changed.
          if (ctrl._toastPromise && !ctrl._dismissed) {
            ctrl.$mdToast.hide();
          }
          reject('No announcement found.');
          return;
        }

        // If there is already a toast promise,
        // avoid creating a new one.
        ctrl._toastPromise = ctrl._toastPromise || ctrl.$mdToast.show({
          // Timeout duration in msecs. false implies no timeout.
          hideDelay: false,
          position: 'top',
          controller: () => {
            return {
              close: () => {
                ctrl.$mdToast.hide();
              }
            }
          },
          controllerAs: '$ctrl',
          templateUrl: 'custom/' + viewName + '/html/announcement.html',
        });

        ctrl._toastPromise.then(hideCallback).catch(hideCallback).then(() => ctrl._dismiss());

        resolve();

      });

    });
  };

};

AnnouncementService.$inject = ['$translate', '$mdToast', '$rootScope'];