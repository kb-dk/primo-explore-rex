import { viewName } from './viewName';

// Clickable logo.
class PrmLogoAfterController {
  constructor(navigation) {
    this.navigation = navigation;
  }

  getIconLink() {
    return this.parentCtrl.iconLink;
  };
}

PrmLogoAfterController.$inject = ['navigation'];

export let PrmLogoAfterConfig = {
  name: 'prmLogoAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmLogoAfterController,
    templateUrl: 'custom/' + viewName + '/html/prmLogoAfter.html'
  }
};