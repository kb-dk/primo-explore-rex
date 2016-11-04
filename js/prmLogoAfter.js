// Clickable logo.

angular.module('viewCustom').controller('prmLogoAfterController', ['navigation', function (navigation) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.navigation = navigation;
  };
  
  ctrl.getIconLink = function () {
    return ctrl.parentCtrl.iconLink;
  };

}]);
  
angular.module('viewCustom').component('prmLogoAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmLogoAfterController',
  templateUrl: 'custom/' + globalViewName +'/html/prmLogoAfter.html'  
});
