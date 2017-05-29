import {
  viewName
} from './viewName';

class LinkedPersonsController {
  constructor(linkedPersonsService, $mdDialog) {
    this.linkedPersonsService = linkedPersonsService;
    this.$mdDialog = $mdDialog;
  };

  $onInit() {
    this.persons = [];

    if (this.uris) {
      this.loadDataForAllPersons();
    }

    console.log(this.persons);
  }

  /**
   * Loads data about the persons from the  
   * Linked Persons service.
   */
  loadDataForAllPersons() {
    this.uris.forEach((uri) => this.loadPersonData(uri));
  }

  loadPersonData(uri) {
    this.linkedPersonsService.get(uri).then((data) => {
      this.persons.push(data);
    });
  };

  /**
   * Pops up a dialog displaying the retrieved information  
   * about the persons.
   */
  showLinkedPersonsDialog(event) {
    this.$mdDialog.show({
      controller: DialogController,
      controllerAs: '$ctrl',
      locals: {
        persons: this.persons,
      },
      // templateUrl: 'custom/' + viewName + '/html/searchTips_' + this.locale.current() + '.html',
      templateUrl: 'custom/' + viewName + '/html/linkedPersonsDialog.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: false // Only for -xs, -sm breakpoints.
    });
  };

}

LinkedPersonsController.$inject = ['linkedPersonsService', '$mdDialog'];

export let LinkedPersonsConfig = {
  name: 'rexLinkedPersons',
  config: {
    bindings: {
      uris: '<'
    },
    controller: LinkedPersonsController,
    templateUrl: 'custom/' + viewName + '/html/linkedPersons.component.html'
  }
}

class DialogController {
  constructor(persons, $mdDialog) {
    this.persons = persons;
    this.$mdDialog = $mdDialog;
  }

  hide() {
    this.$mdDialog.hide();
  }

  cancel() {
    this.$mdDialog.cancel();
  }
}