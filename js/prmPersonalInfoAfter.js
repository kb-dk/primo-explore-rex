angular.module('viewCustom').controller('prmPersonalInfoAfterController', ['navigation', function (navigation) {
  var ctrl = this;

  
  ctrl.$onInit = function () {
    ctrl.parentCtrl.editDetails = () => { navigation.navigateTo('https://user.kb.dk/user/edit')};
  }

}]);
  
angular.module('viewCustom').component('prmPersonalInfoAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmPersonalInfoAfterController',
});