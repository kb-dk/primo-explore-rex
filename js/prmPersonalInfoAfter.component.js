class PrmPersonalInfoAfterController {

  constructor(navigationService) {
    this.navigationService = navigationService;
  }

  $onInit() {
    // Overwrite the functionality of the 'Edit' button.
    // It now navigates to the corresponding editing page for the user database.
    this.parentCtrl.editDetails = () => {
      this.navigationService.navigateTo('https://user.kb.dk/user/edit')
    };
  }

}

PrmPersonalInfoAfterController.$inject = ['navigationService'];

export let PrmPersonalInfoAfterConfig = {
  name: 'prmPersonalInfoAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmPersonalInfoAfterController,    
  }
}