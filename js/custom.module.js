// Define the view name here.
var globalViewName = "NUI";

angular.module('viewCustom', ['angularLoad', 'ngMaterial']).run(function($rootScope) {
  $rootScope.globalViewName = globalViewName;
})