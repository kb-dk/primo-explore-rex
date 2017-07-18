import { viewName } from './viewName';

class SearchTipsController {
  constructor($mdDialog, localeService) {
    this.$mdDialog = $mdDialog;
    this.localeService = localeService;
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
      templateUrl: 'custom/' + viewName + '/html/searchTips_' + this.localeService.current() + '.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

}

SearchTipsController.$inject = ['$mdDialog', 'localeService'];

export let SearchTipsConfig = {
  name: 'rexSearchTips',
  config: {
    controller: SearchTipsController,
    templateUrl: 'custom/' + viewName + '/html/searchTips.component.html'
  }
}