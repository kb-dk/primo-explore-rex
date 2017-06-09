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
      this.loadDataForAllPersons().then(this.onLoad);
    }    
  }

  /**
   * Loads data about the persons from the  
   * Linked Persons service.
   *
   * @return {Promise} A promise that resolves if all persons are 
   * loaded, and rejects if any of them fails to be loaded.
   */
  loadDataForAllPersons() {
    return Promise.all(this.uris.map((uri) => this.loadPersonData(uri)));
  }

  loadPersonData(uri) {
    return this.linkedPersonsService.get(uri).then((data) => {
      this.persons.push(data);
    });
  };

}

LinkedPersonsController.$inject = ['linkedPersonsService', '$mdDialog'];

export let LinkedPersonsConfig = {
  name: 'rexLinkedPersons',
  config: {
    bindings: {
      uris: '<',
      onLoad: '&',
    },
    controller: LinkedPersonsController,
    templateUrl: 'custom/' + viewName + '/html/linkedPersons.component.html',
  }
}