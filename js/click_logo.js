/* create clickable logo*/

angular.module('viewCustom').controller('prmLogoAfterController', [function () {
  var vm = this;
  vm.getIconLink = getIconLink;
  function getIconLink() {
  return vm.parentCtrl.iconLink;
}
}]);
 
 
 
angular.module('viewCustom').component('prmLogoAfter',{
  bindings: {parentCtrl: '<'},
  controller: 'prmLogoAfterController',
  template: `<div class="product-logo product-logo-local" layout="row" layout-align="start center" layout-fill id="banner" tabindex="0" role="banner">
  <a href="http://rex.kb.dk/primo-explore/search?vid=NUI">
  <img class="logo-image" alt="{{::('nui.header.LogoAlt' | translate)}}" ng-src="{{$ctrl.getIconLink()}}"/>
  </a>
  </div>`
});
