angular.module('viewCustom').controller('prmFullViewAfterController', [
  'sectionOrdering',
  '$element',
  '$scope',
  '$rootScope',
  '$compile',
  '$http',
  function(sectionOrdering, $element, $scope, $rootScope, $compile, $http) {
    var ctrl = this;

    ctrl.$onInit = function() {
      if (sectionOrdering(ctrl.parentCtrl.services)) console.log('REX: Sections reordered.');

      // Insert the altmetrics badge if a DOI is present.
      try {
        ctrl.doi = ctrl.parentCtrl.item.pnx.addata.doi[0];

        if (!ctrl.doi) throw Error('REX: Altmetrics badge is not loaded as no DOI is present.');

        // ctrl.loadAltmetricsBadge();
        $http.get('https://api.altmetric.com/v1/doi/' + ctrl.doi).then(ctrl.loadAltmetricsBadge).catch(function() {
          console.log('REX: Altmetrics do not have any information on this resource.');
        });

      } catch (e) {
        console.log(e.message);
      };
    };

    ctrl.loadAltmetricsBadge = function() {

      ctrl.parentElement = $element.parent();

      var altmetrics_section = {
        scrollId: "altmetrics",
        serviceName: "altmetrics",
        title: "brief.results.tabs.Altmetrics"
      };
      ctrl.parentCtrl.services.splice(ctrl.parentCtrl.services.length - 1, 0, altmetrics_section);

      // Waiting for the Altmetrics section to be created.
      $scope.$watch(angular.bind(ctrl, function() {
        return ctrl.parentElement[0].querySelector('h2[translate="brief.results.tabs.Altmetrics"]');
      }), function(newVal, oldVal) {
        if (!oldVal && newVal !== oldVal) {
          var containerElement = newVal.parentElement.parentElement.parentElement.parentElement.children[1];

          ctrl.altmetricsScope = $rootScope.$new();
          var altmetricsElement = angular.element('<rex-altmetrics doi="\'' + ctrl.doi + '\'"></rex-altmetrics>');

          containerElement.append(altmetricsElement[0]);
          $compile(altmetricsElement)(ctrl.altmetricsScope);
        }
      });
    };

    // Destroying the Altmetrics badge explicitly, since it is compiled manually.
    ctrl.$onDestroy = function() {
      if (ctrl.altmetricsScope) ctrl.altmetricsScope.$destroy();
    };

  }
]);

angular.module('viewCustom').component('prmFullViewAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: 'prmFullViewAfterController',
});