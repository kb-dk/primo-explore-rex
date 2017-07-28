class PrmTopbarAfterController {
  constructor(announcementService, $scope, $element, $translate) {
    this.announcementService = announcementService;
    this.$scope = $scope;
    this.$element = $element;
    this.$translate = $translate;
  }

  $onInit() {
    // Announcement displayed.
    this.announcementService.display(() => this.hideCallback())
      .then(() => this.displayCallback())
      .catch((e) => {
        if (e) console.log(e);
      });

    let nameElements = this.$element.parent()[0].getElementsByClassName('user-name');

    // Replace the 'Guest' label with 'Log in' to cue the user where to login.
    // TODO: Test this on each new release to see if it is still needed,
    // and remove otherwise.
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

PrmTopbarAfterController.$inject = ['announcementService', '$scope', '$element', '$translate'];

export let PrmTopbarAfterConfig = {
  name: 'prmTopbarAfter',
  config: {
    controller: PrmTopbarAfterController,
    require: {
      primoExploreCtrl: '^primoExplore'
    }
  }
};