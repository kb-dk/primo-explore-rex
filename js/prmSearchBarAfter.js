// angular.module('viewCustom').controller('prmSearchBarAfterController', ['$scope', '$element', '$mdDialog', function($scope, $element, $mdDialog) {
//   var ctrl = this;

//   ctrl.$postLink = function() {

//     // var container = angular.element($element.parent().children()[0].children[0].children[3]);
//     // container.append($element.children()[0]);

//   };

//   // ctrl.showSearchTips = function() {
//   //   console.log('Done!');
//   // }

//   $scope.status = '  ';
//   $scope.customFullscreen = false;

//   // ctrl.showSearchTips = function(ev) {
//   //   // Appending dialog to document.body to cover sidenav in docs app
//   //   // Modal dialogs should fully cover application
//   //   // to prevent interaction outside of dialog
//   //   $mdDialog.show(
//   //     $mdDialog.alert()
//   //     .parent(angular.element(document.querySelector('#popupContainer')))
//   //     .clickOutsideToClose(true)
//   //     .title('This is an alert title')
//   //     .textContent('You can specify some description text in here.')
//   //     .ariaLabel('Alert Dialog Demo')
//   //     .ok('Got it!')
//   //     .targetEvent(ev)
//   //   );
//   // };

//   // ctrl.showSearchTips = function(ev) {
//   //   $mdDialog.show({
//   //       controller: DialogController,
//   //       templateUrl: 'custom/' + globalViewName + '/html/searchTips.html',
//   //       parent: angular.element(document.body),
//   //       targetEvent: ev,
//   //       clickOutsideToClose: true,
//   //       fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
//   //     })
//   //     .then(function(answer) {
//   //       $scope.status = 'You said the information was "' + answer + '".';
//   //     }, function() {
//   //       $scope.status = 'You cancelled the dialog.';
//   //     });
//   // };

//   // function DialogController($scope, $mdDialog) {
//   //   $scope.hide = function() {
//   //     $mdDialog.hide();
//   //   };

//   //   $scope.cancel = function() {
//   //     $mdDialog.cancel();
//   //   };

//   //   $scope.answer = function(answer) {
//   //     $mdDialog.hide(answer);
//   //   };
//   // }



// }]);

// angular.module('viewCustom').component('prmSearchBarAfter', {
//   bindings: {
//     parentCtrl: '<'
//   },
//   // templateUrl: 'custom/' + globalViewName + '/html/prmSearchBarAfter.html',
//   controller: 'prmSearchBarAfterController',
// });