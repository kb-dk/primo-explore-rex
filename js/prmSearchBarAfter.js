angular.module('viewCustom').controller('prmSearchBarAfterController', ['$element', function($element) {
  var ctrl = this;

  ctrl.$postLink = function() {
    var container = angular.element($element.parent().children()[0].children[0]);
    container.append($element.children()[0]);
  };

}]);

angular.module('viewCustom').component('prmSearchBarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  templateUrl: 'custom/' + globalViewName + '/html/prmSearchBarAfter.html',
  controller: 'prmSearchBarAfterController',
});