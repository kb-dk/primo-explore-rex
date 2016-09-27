angular.module('viewCustom').component('prmFullViewAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: ['sectionOrdering', function(sectionOrdering) {
    var ctrl = this;

    ctrl.$onInit = function () {
      sectionOrdering(ctrl.parentCtrl.services);
    };

  }]
});