import { viewName } from './viewName';

class PrmSearchBarAfterController {
  constructor($element) {
    this.$element = $element;
  };

  $postLink() {
    let container = angular.element(this.$element.parent().children()[0].children[0]);
    container.append(this.$element.children()[0]);
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