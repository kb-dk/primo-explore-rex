require('./altmetrics');
require('./sectionOrdering');

angular.module('viewCustom').controller('prmFullViewAfterController', [
  'sectionOrdering',
  '$element',
  '$scope',
  function(sectionOrdering, $element, $scope) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.parentElement = $element.parent()[0];

      if (sectionOrdering(ctrl.parentCtrl.services)) console.log('REX: Sections reordered.');

      // Retrieve the DOI if it is present.
      try {
        ctrl.doi = ctrl.parentCtrl.item.pnx.addata.doi[0];
      } catch (e) {
        console.log(e.message);
      };
    };

    ctrl.insertAltmetricsBadge = function() {
      ctrl.createAltmetricsSectionElement();

      // Wait for the Altmetrics section to be created.
      $scope.$watch(angular.bind(ctrl, function() {
        return ctrl.parentElement.querySelector('h2[translate="brief.results.tabs.Altmetrics"]');
      }), function(newVal, oldVal) {
        if (!oldVal && newVal !== oldVal) {
          let containerElement = newVal.parentElement.parentElement.parentElement.parentElement.children[1];

          // Move the badge into the Altmetrics section.
          if (containerElement && containerElement.appendChild)
            containerElement.appendChild($element.children()[0]);
        }
      });
    };

    // Create Altmetrics section.
    ctrl.createAltmetricsSectionElement = () => {
      var altmetrics_section = {
        scrollId: "altmetrics",
        serviceName: "altmetrics",
        title: "brief.results.tabs.Altmetrics"
      };
      ctrl.parentCtrl.services.splice(ctrl.parentCtrl.services.length - 1, 0, altmetrics_section);
    };

  }
]);

angular.module('viewCustom').component('prmFullViewAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: 'prmFullViewAfterController',
  template: '<rex-altmetrics doi="$ctrl.doi" on-load="$ctrl.insertAltmetricsBadge()"></rex-altmetrics>',
});