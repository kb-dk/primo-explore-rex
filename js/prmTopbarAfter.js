angular.module('viewCustom').controller('prmTopbarAfterController', ['$element', 'announcement', function($element, announcement) {
  var ctrl = this;

  ctrl.$onInit = function() {
    announcement.display($element.parent());
  };

}]);

angular.module('viewCustom').component('prmTopbarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmTopbarAfterController',
});