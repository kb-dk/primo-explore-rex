require('./announcement');

angular.module('viewCustom').controller('prmTopbarAfterController', [
  '$scope',
  '$element',
  'announcement',
  function($scope, $element, announcement) {
    var ctrl = this;

    ctrl.$onInit = () => {
      // Announcement displayed.
      announcement.display(ctrl.hideCallback)
        .then(ctrl.displayCallback)
        .catch((e) => {
          if (e) console.log(e);
        });
    };

    ctrl.displayCallback = () => {
      $element.parent().addClass('shifted-topbar');
    };

    ctrl.hideCallback = () => {
      $element.parent().removeClass('shifted-topbar');
    };

  }
]);

angular.module('viewCustom').component('prmTopbarAfter', {
  controller: 'prmTopbarAfterController',
});