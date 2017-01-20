// Define the view name here.
var globalViewName = "NUI";

angular.module('viewCustom', [
  'angularLoad',
  'ngMaterial',
  'ngCookies'
]).run(['$rootScope', function($rootScope) {
  $rootScope.globalViewName = globalViewName;
}]);