import { viewName } from './viewName';

// Clickable logo.
class PrmLogoAfterController {
  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  getIconLink() {
    return this.parentCtrl.iconLink;
  };
}

PrmLogoAfterController.$inject = ['navigationService'];

export let PrmLogoAfterConfig = {
  name: 'prmLogoAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmLogoAfterController,
    templateUrl: 'custom/' + viewName + '/html/prmLogoAfter.component.html'
  }
};