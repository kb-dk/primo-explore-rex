class PrmFullViewAfterController {
  constructor(sectionOrdering, $element, $scope) {
    this.sectionOrdering = sectionOrdering;
    this.$element = $element;
    this.$scope = $scope;
  }

  $onInit() {
    this.parentElement = this.$element.parent()[0];

    if (this.sectionOrdering.orderSections(this.parentCtrl.services)) console.log('REX: Sections reordered.');

    // Retrieve the DOI if it is present.
    try {
      this.doi = this.parentCtrl.item.pnx.addata.doi[0];
    } catch (e) {
      console.log(e.message);
    };
  };

  insertAltmetricsBadge() {
    this.createAltmetricsSectionElement();

    // Wait for the Altmetrics section to be created.
    this.$scope.$watch(() => this.parentElement.querySelector('h2[translate="brief.results.tabs.Altmetrics"]'),
      (newVal, oldVal) => {
        if (!oldVal && newVal !== oldVal) {
          let containerElement = newVal.parentElement.parentElement.parentElement.parentElement.children[1];

          // Move the badge into the Altmetrics section.
          if (containerElement && containerElement.appendChild)
            containerElement.appendChild(this.$element.children()[0]);
        }
      }
    );

  };

  // Create Altmetrics section.
  createAltmetricsSectionElement() {
    let altmetricsSection = {
      scrollId: "altmetrics",
      serviceName: "altmetrics",
      title: "brief.results.tabs.Altmetrics"
    };
    this.parentCtrl.services.splice(this.parentCtrl.services.length - 1, 0, altmetricsSection);
  };

};

PrmFullViewAfterController.$inject = ['sectionOrdering', '$element', '$scope'];

export let PrmFullViewAfterConfig = {
  name: 'prmFullViewAfter',
  config: {
    bindings: {
      parentCtrl: '<',
    },
    controller: PrmFullViewAfterController,
    template: '<rex-altmetrics doi="$ctrl.doi" on-load="$ctrl.insertAltmetricsBadge()"></rex-altmetrics>',
  }
};