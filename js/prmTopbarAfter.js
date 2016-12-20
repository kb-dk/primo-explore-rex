angular.module('viewCustom').controller('prmTopbarAfterController', ['$element', 'announcement', '$interval', '$rootScope', function($element, announcement, $interval, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function() {
    // Announcement displayed.
    announcement.display($element.parent());
  };

}]);

angular.module('viewCustom').component('prmTopbarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  controller: 'prmTopbarAfterController',
});