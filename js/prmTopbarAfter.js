angular.module('viewCustom').controller('prmTopbarAfterController', [
  '$element',
  'announcement',
  function($element, announcement) {
    var ctrl = this;

    ctrl.$onInit = function() {
      // Announcement displayed.
      announcement.display(ctrl.hideCallback)
        .then(ctrl.displayCallback)
        .catch((e) => {});
    };

    ctrl.displayCallback = function() {
      $element.parent().addClass('shifted-topbar');
    };

    ctrl.hideCallback = function() {
      $element.parent().removeClass('shifted-topbar');
    };

  }
]);

angular.module('viewCustom').component('prmTopbarAfter', {
  controller: 'prmTopbarAfterController',
});