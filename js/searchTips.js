angular.module('viewCustom').controller('searchTipsContoller', [
  'navigation',
  '$mdDialog',
  '$locale',
  function(navigation, $mdDialog, $locale) {
    var ctrl = this;

    ctrl.showSearchTips = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'custom/' + globalViewName + '/html/searchTips_' + $locale.localeID + '.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: false // Only for -xs, -sm breakpoints.
      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };

      $scope.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    }

  }
]);

angular.module('viewCustom').component('rexSearchTips', {
  controller: 'searchTipsContoller',
  templateUrl: 'custom/' + globalViewName + '/html/searchTips.html'
});