angular.module('viewCustom').component('prmRequestServicesAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: ['requestLinkRemoval', function(requestLinkRemoval) {
    var ctrl = this;

    ctrl.$onInit = function () {
      console.log('prmRequestServicesAfter hit!');
      // Remove the request link if the user is logged in. Otherwise, an authentication warning will appear in its place.
      if(ctrl.parentCtrl.isLoggedIn()) {
        requestLinkRemoval();
      }
    };

  }]
});

