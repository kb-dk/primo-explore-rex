class PrmFullViewAfterController {
  constructor(sectionOrdering, $element, $scope) {
    this.sectionOrdering = sectionOrdering;
    this.$element = $element;
    this.$scope = $scope;
  }

  $onInit() {
    this.parentElement = this.$element.parent()[0];

    // Retrieve the DOI if it is present.
    try {
      this.doi = this.parentCtrl.item.pnx.addata.doi[0];
    } catch (e) {
      console.log('DOI not found.');
      // console.log(e.message);
    };

    // Retrieve the VIAF URIs if present.
    try {
      // This does not seem to fail when no VIAF URI is present.
      this.viaf_uris = this.parentCtrl.item.pnx.addata.lad06;
    } catch (e) {
      console.log('No VIAF URI found.');
      // console.log(e.message);
    };

    if (this.sectionOrdering.orderSections(this.parentCtrl.services)) {
      console.log('REX: Sections reordered.');
    }

  };

  insertAltmetricsSection() {
    let altmetricsSectionData = {
      scrollId: "altmetrics",
      serviceName: "altmetrics",
      title: "brief.results.tabs.Altmetrics"
    };
    let altmetricsSectionElement = this.$element.find('rex-altmetrics')[0];

    this.insertSection(altmetricsSectionData, altmetricsSectionElement);
  };

  insertAuthorsSection() {
    let authorsSectionData = {
      scrollId: "authors",
      serviceName: "authors",
      title: "brief.results.tabs.Authors"
    };
    let authorsSectionElement = this.$element.find('rex-linked-persons')[0];

    this.insertSection(authorsSectionData, authorsSectionElement);

  };

  insertSection(sectionData, sectionElement) {
    this.insertSectionData(sectionData);

    let targetSelector = 'h2[translate="' + sectionData.title + '"]';

    // Wait for the target element to be created.
    this.$scope.$watch(() => this.parentElement.querySelector(targetSelector),
      (newVal, oldVal) => {
        if (!oldVal && newVal !== oldVal) {
          let targetElement = newVal.parentElement.parentElement.parentElement.parentElement.children[1];

          // Move the section into the target element.
          if (targetElement && targetElement.appendChild) {
            targetElement.appendChild(sectionElement);
            // targetElement.appendChild(this.$element.children()[0]);
          }
        }
      }
    );

  }

  insertSectionData(sectionData) {
    this.parentCtrl.services.splice(this.parentCtrl.services.length - 1, 0, sectionData);
  }

};

PrmFullViewAfterController.$inject = ['sectionOrdering', '$element', '$scope'];

export let PrmFullViewAfterConfig = {
  name: 'prmFullViewAfter',
  config: {
    bindings: {
      parentCtrl: '<',
    },
    controller: PrmFullViewAfterController,
    template: `
      <rex-altmetrics ng-if="$ctrl.doi" doi="$ctrl.doi" on-load="$ctrl.insertAltmetricsSection()"></rex-altmetrics>
      <rex-linked-persons ng-if="$ctrl.viaf_uris" uris="$ctrl.viaf_uris" on-load="$ctrl.insertAuthorsSection()"></rex-linked-persons>
    `,
  }
};