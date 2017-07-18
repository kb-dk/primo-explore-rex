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

    let searchBarElement = parentElement[0].querySelector('#searchBar');
    
    // Focus on the search bar, if it exists.
    // Note that, when the language is changed, 
    // the search bar is not available yet here.
    // We can watch for the element and then focus on it,
    // but it does not seem to worth it.
    if (searchBarElement) {
      searchBarElement.focus();
    }

  };
}

PrmSearchBarAfterController.$inject = ['$element'];

export let PrmSearchBarAfterConfig = {
  name: 'prmSearchBarAfter',
  config: {
    templateUrl: 'custom/' + viewName + '/html/prmSearchBarAfter.component.html',
    controller: PrmSearchBarAfterController,
  }
}