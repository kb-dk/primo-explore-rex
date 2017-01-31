class PrmTopbarAfterController {
  constructor(announcement, $scope, $element, $translate) {
    this.announcement = announcement;
    this.$scope = $scope;
    this.$element = $element;
    this.$translate = $translate;
  }

  $onInit() {
    // Announcement displayed.
    this.announcement.display(() => this.hideCallback())
      .then(() => this.displayCallback())
      .catch((e) => {
        if (e) console.log(e);
      });

    let nameElements = this.$element.parent()[0].getElementsByClassName('user-name');

    // Replace the 'Guest' label with 'Log in' to cue the user where to login.
    // TODO: Test if this is still needed with the February release.
    this.$scope.$watch(nameElements.length, (newVal, oldVal) => {
      Array.prototype.forEach.call(nameElements, (element) => {
        if (this.primoExploreCtrl.userSessionManagerService.isGuest()) {
          this.$translate('eshelf.signin.title').then((translation) => {
            element.textContent = translation;
          });
        };
      });
    });

  };

  displayCallback() {
    this.$element.parent().addClass('shifted-topbar');
  };

  hideCallback() {
    this.$element.parent().removeClass('shifted-topbar');
  };

}

PrmTopbarAfterController.$inject = ['announcement', '$scope', '$element', '$translate'];

export let PrmTopbarAfterConfig = {
  name: 'prmTopbarAfter',
  config: {
    controller: PrmTopbarAfterController,
    require: {
      primoExploreCtrl: '^primoExplore'
    }
  }
};