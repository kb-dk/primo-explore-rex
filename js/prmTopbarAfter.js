require('./announcement');

angular.module('viewCustom').controller('prmTopbarAfterController', [
  '$scope',
  '$element',
  'announcement',
  '$translate',
  function($scope, $element, announcement, $translate) {
    var ctrl = this;

    ctrl.$onInit = () => {
      // Announcement displayed.
      announcement.display(ctrl.hideCallback)
        .then(ctrl.displayCallback)
        .catch((e) => {
          if (e) console.log(e);
        });

      ctrl.nameElements = $element.parent()[0].getElementsByClassName('user-name');

    };

    // Replace the 'Guest' label with 'Log in' to cue the user where to login.
    // TODO: Test if this is still needed with the February release.
    $scope.$watch(angular.bind(ctrl, () => ctrl.nameElements.length), (newVal, oldVal) => {
      Array.prototype.forEach.call(ctrl.nameElements, function(element) {
        if (ctrl.primoExploreCtrl.userSessionManagerService.isGuest()) {
          $translate('eshelf.signin.title').then((translation) => {
            element.textContent = translation;
          });
        }
      });
    })

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
  require: {
    primoExploreCtrl: '^primoExplore'
  }
});