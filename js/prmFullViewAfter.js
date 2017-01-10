angular.module('viewCustom').controller('prmFullViewAfterController', [
  'sectionOrdering',
  '$element',
  '$scope',
  function(sectionOrdering, $element, $scope) {
    var ctrl = this;

    ctrl.$onInit = function() {
      if (sectionOrdering(ctrl.parentCtrl.services)) console.log('REX: Sections reordered.');

      // Insert the altmetrics badge if a DOI is present.
      try {
        ctrl.doi = ctrl.parentCtrl.item.pnx.addata.doi[0];

        if (!ctrl.doi) throw Error('REX: Altmetrics badge cannot be positioned as no DOI is present.');

        ctrl.parentElement = $element.parent();
        var altmetrics_section = {
          scrollId: "altmetrics",
          serviceName: "altmetrics",
          title: "brief.results.tabs.Altmetrics"
        };
        ctrl.parentCtrl.services.splice(ctrl.parentCtrl.services.length - 1, 0, altmetrics_section);
        
        // We should only watch if a DOI is present.
        $scope.$watch(angular.bind(ctrl, function() {
          return ctrl.parentElement[0].querySelector('h2[translate="brief.results.tabs.Altmetrics"]');
        }), function(newVal, oldVal) {
          if (!oldVal && newVal !== oldVal) {
            var containerElement = newVal.parentElement.parentElement.parentElement.parentElement.children[1];
            containerElement.append($element.children()[0]);
          }
        });

      } catch (e) {
        console.log(e.message);
      };
    };


  }
]);

angular.module('viewCustom').component('prmFullViewAfter', {
  bindings: {
    parentCtrl: '<',
  },
  template: '<rex-altmetrics doi="$ctrl.doi"></rex-altmetrics>',
  controller: 'prmFullViewAfterController',
});