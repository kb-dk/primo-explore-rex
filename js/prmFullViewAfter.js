angular.module('viewCustom').component('prmFullViewAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: ['sectionOrdering', function(sectionOrdering) {
    var ctrl = this;

    ctrl.$onInit = function() {
      if (sectionOrdering(ctrl.parentCtrl)) console.log('REX: Sections reordered.');
    };
  }]
});