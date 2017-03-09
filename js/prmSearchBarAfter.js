import { viewName } from './viewName';

class PrmSearchBarAfterController {
  constructor($element) {
    this.$element = $element;
  };

  $postLink() {

    let parentElement = this.$element.parent();

    // Move the search tips.
    let container = angular.element(parentElement.children()[0].children[0]);
    container.append(this.$element.children()[0]);

    // Focus on the search bar.
    parentElement[0].querySelector('#searchBar').focus();
    
  };
}

PrmSearchBarAfterController.$inject = ['$element'];

export let PrmSearchBarAfterConfig = {
  name: 'prmSearchBarAfter',
  config: {
    templateUrl: 'custom/' + viewName + '/html/prmSearchBarAfter.html',
    controller: PrmSearchBarAfterController,
  }
}