// TODO: Needs refactoring. Extract the logic into a service.
angular.module('viewCustom').controller('prmSearchBarAfterController', ['$element', '$mdDialog', '$locale', function($element, $mdDialog, $locale) {
  var ctrl = this;

  ctrl.$postLink = function() {

    var container = angular.element($element.parent().children()[0].children[0]);
    console.log($element.parent());

    container.append($element.children()[0]);
  };

  ctrl.showSearchTips = function(ev) {
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'custom/' + globalViewName + '/html/searchTips_' + $locale.localeID +'.html',
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

}]);

angular.module('viewCustom').component('prmSearchBarAfter', {
  bindings: {
    parentCtrl: '<'
  },
  // templateUrl: 'custom/' + globalViewName + '/html/prmSearchBarAfter.html',
  template: `
<div flex hide show-gt-sm layout-align='end center' layout='row' >
<rex-search-tip>
  <md-button class="md-icon-button" aria-label="Search Tips" ng-click='$ctrl.showSearchTips($event)'>
    <md-tooltip md-direction="bottom">Search tips</md-tooltip>
    <md-icon md-svg-icon='primo-ui:help-circle-outline'></md-icon>
  </md-button>
</rex-search-tip>
</div>
  `,
  controller: 'prmSearchBarAfterController',
});