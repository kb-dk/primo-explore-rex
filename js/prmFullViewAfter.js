angular.module('viewCustom').controller('prmFullViewAfterController', [
  'sectionOrdering',
  function(sectionOrdering) {
    var ctrl = this;

    ctrl.$onInit = function() {
      // Commenting this out as the request link should not be removed any more.
      if (sectionOrdering(ctrl.parentCtrl)) console.log('REX: Sections reordered.');
    };

  }
]);

angular.module('viewCustom').component('prmFullViewAfter', {
  bindings: {
    parentCtrl: '<',
  },
  template: '<rex-altmetrics parent-ctrl="$ctrl"></rex-altmetrics>',
  controller: 'prmFullViewAfterController',
});