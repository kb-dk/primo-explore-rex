angular.module('viewCustom').component('prmRequestServicesAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: ['requestLinkRemoval', function(requestLinkRemoval) {
    var ctrl = this;

    ctrl.$onInit = function () {
      if(requestLinkRemoval(ctrl.parentCtrl)) console.log('REX: Request link removed.');      
    };

  }]
});

