// Define the view name here.
var globalViewName = "NORTH";

angular.module('viewCustom', ['angularLoad', 'ngMaterial']).run(function($rootScope) {
  $rootScope.globalViewName = globalViewName;
});