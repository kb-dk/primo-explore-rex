import {globalViewName} from './viewName';

angular.module('viewCustom', [
  'angularLoad',
  'ngMaterial'
]).run(['$rootScope', function($rootScope) {
  $rootScope.globalViewName = globalViewName;
}]);

require('./openingHours');
require('./prmBriefResultAfter');
require('./prmFinesAfter');
require('./prmFullViewAfter');
require('./prmLogoAfter');
require('./prmPersonalInfoAfter');
require('./prmRequestsAfter');
require('./prmRequestServicesAfter');
require('./prmRequestsOverviewAfter');
require('./prmSearchBarAfter');
require('./prmTopbarAfter');
