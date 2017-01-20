// Define the view name here.
var globalViewName = "NUI";

angular.module('viewCustom', [
  'angularLoad',
  'ngMaterial'
]).run(['$rootScope', function($rootScope) {
  $rootScope.globalViewName = globalViewName;
}]);