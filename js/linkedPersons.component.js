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
      this.loadPersons().then(this.onLoad).catch(() => {
        console.log('Could not fetch data about the author.');
      });
    }    
  }

  /**
   * Loads data about the persons from the  
   * Linked Persons service.
   *
   * @return {Promise} A promise that resolves if all persons are 
   * loaded, and rejects if any of them fails to be loaded.
   */
  loadPersons() {
    return this.linkedPersonsService.getMultiple(this.uris).then(persons => {
      this.persons = persons;
    });
  }

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