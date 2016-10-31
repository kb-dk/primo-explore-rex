angular.module('viewCustom').controller('prmPersonalInfoAfterController', ['navigation', function (navigation) {
  var ctrl = this;

  ctrl.$onInit = function () {
    // Replacing the functionality of the 'Edit' button.
    // It now navigates the user to the corresponding editing page for the user database.
    ctrl.parentCtrl.editDetails = () => { navigation.navigateTo('https://user.kb.dk/user/edit')};
  }

}]);
  
angular.module('viewCustom').component('prmPersonalInfoAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmPersonalInfoAfterController',
});