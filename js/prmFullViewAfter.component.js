import {
  viewName
} from './viewName';

class PrmFullViewAfterController {
  constructor($element, $scope) {
    this.$element = $element;
    this.$scope = $scope;
  }

  $onInit() {
    this.parentElement = this.$element.parent()[0];

    this.retrieveDoiIfPresent();
    this.retrieveViafIdsIfPresent();

  }

  retrieveDoiIfPresent() {
    try {
      this.doi = this.parentCtrl.item.pnx.addata.doi[0];
    } catch (e) {
      console.log('DOI not found.');
    };
  }

  retrieveViafIdsIfPresent() {
    try {
      // This does not seem to fail when no VIAF URI is present.
      this.viafUris = this.parentCtrl.item.pnx.addata.lad06;
    } catch (e) {
      console.log('No VIAF URI found.');
    };
  }

  insertAltmetricsSection() {
    let altmetricsSectionData = {
      scrollId: "altmetrics",
      serviceName: "altmetrics",
      title: "brief.results.tabs.Altmetrics"
    };
    let altmetricsSectionElement = this.$element.find('rex-altmetrics')[0];

    this.insertSection(altmetricsSectionData, altmetricsSectionElement);
  }

  insertAuthorsSection() {
    let authorsSectionData = {
      scrollId: "authors",
      serviceName: "authors",
      title: "brief.results.tabs.Authors"
    };
    let authorsSectionElement = this.$element.find('rex-linked-persons')[0];

    this.insertSection(authorsSectionData, authorsSectionElement);
  }

  insertSection(sectionData, sectionElement) {
    // The title of the new section is used to idenitfy the section
    // element.
    let sectionTitleSelector = 'h4[translate="' + sectionData.title + '"]';

    // We set up the watcher before inserting the section data,
    // to ensure that the watcher catches the change.
    this.waitForTargetThenMoveSection(sectionTitleSelector, sectionElement);
    this.insertSectionData(sectionData);
  }

  // Wait for the target element to be created.
  waitForTargetThenMoveSection(sectionTitleSelector, sectionElement) {
    let unbindWatcher = this.$scope.$watch(() =>
      this.parentElement.querySelector(sectionTitleSelector),
      (newVal, oldVal) => {
        if (newVal) {
          this.moveSectionElement(newVal, sectionElement);
          unbindWatcher();
        }
      }
    );
  }

  moveSectionElement(identifierElement, sectionElement) {
    let targetElement = identifierElement.parentElement.parentElement.parentElement.parentElement.children[1];

    // Move the section into the target element.
    if (targetElement && targetElement.appendChild) {
      targetElement.appendChild(sectionElement);
      // targetElement.appendChild(this.$element.children()[0]);
    }
  }

  insertSectionData(sectionData) {
    this.parentCtrl.services.splice(this.parentCtrl.services.length - 1, 0, sectionData);
  }

}

PrmFullViewAfterController.$inject = ['$element', '$scope'];

export let PrmFullViewAfterConfig = {
  name: 'prmFullViewAfter',
  config: {
    bindings: {
      parentCtrl: '<',
    },
    controller: PrmFullViewAfterController,
    templateUrl: 'custom/' + viewName + '/html/prmFullViewAfter.component.html',
  }
};