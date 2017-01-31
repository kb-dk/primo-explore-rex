import { viewName } from './viewName';

class SearchTipsController {
  constructor($mdDialog, $locale) {
    this.$mdDialog = $mdDialog;
    this.$locale = $locale;
  };

  /**
   * Pops up a dialog message containing 
   * the search tips in the selected language.
   */
  showSearchTips(event) {
    this.$mdDialog.show({
      controller: () => {
        return {
          hide: () => { this.$mdDialog.hide() },
          cancel: () => { this.$mdDialog.cancel() },
        }
      },
      controllerAs: '$ctrl',
      templateUrl: 'custom/' + viewName + '/html/searchTips_' + this.$locale.localeID + '.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

}

SearchTipsController.$inject = ['$mdDialog', '$locale'];

export let SearchTipsConfig = {
  name: 'rexSearchTips',
  config: {
    controller: SearchTipsController,
    templateUrl: 'custom/' + viewName + '/html/searchTips.html'
  }
}