import { viewName } from './viewName';

import { NavigationService } from './navigation';
import { AnnouncementService } from './announcement';
import { ScriptLoaderService } from './scriptLoader';
import { SectionOrderingService } from './sectionOrdering';
import { PickUpNumbersService } from './pickUpNumbers';

import { OpeningHoursConfig } from './openingHours';
import { SearchTipsConfig } from './searchTips';
import { AltmetricsConfig } from './altmetrics';

import { PrmFinesAfterConfig } from './prmFinesAfter';
import { PrmLogoAfterConfig } from './prmLogoAfter';
import { PrmTopbarAfterConfig } from './prmTopbarAfter';
import { PrmSearchBarAfterConfig } from './prmSearchBarAfter';
import { PrmFullViewAfterConfig } from './prmFullViewAfter';
import { PrmPersonalInfoAfterConfig } from './prmPersonalInfoAfter';
import { PrmRequestsAfterConfig } from './prmRequestsAfter';
import { PrmRequestsOverviewAfterConfig } from './prmRequestsOverviewAfter';
import { PrmRequestServicesAfterConfig } from './prmRequestServicesAfter';
// import { PrmBriefResultAfterConfig } from './prmBriefResultAfter';

angular.module('viewCustom', [
  'angularLoadMonkeyPatched',
  'ngMaterial'
]).run(['$rootScope', function($rootScope) {
  $rootScope.viewName = viewName;
}]);

angular.module('viewCustom').service('navigation', NavigationService)
  .service('announcement', AnnouncementService)
  .service('scriptLoader', ScriptLoaderService)
  .service('sectionOrdering', SectionOrderingService)
  .service('pickUpNumbers', PickUpNumbersService)
  .component(OpeningHoursConfig.name, OpeningHoursConfig.config)
  .component(SearchTipsConfig.name, SearchTipsConfig.config)
  .component(AltmetricsConfig.name, AltmetricsConfig.config)
  .component(PrmFinesAfterConfig.name, PrmFinesAfterConfig.config)
  .component(PrmLogoAfterConfig.name, PrmLogoAfterConfig.config)
  .component(PrmTopbarAfterConfig.name, PrmTopbarAfterConfig.config)
  .component(PrmSearchBarAfterConfig.name, PrmSearchBarAfterConfig.config)
  .component(PrmFullViewAfterConfig.name, PrmFullViewAfterConfig.config)
  .component(PrmPersonalInfoAfterConfig.name, PrmPersonalInfoAfterConfig.config)
  .component(PrmRequestsAfterConfig.name, PrmRequestsAfterConfig.config)
  .component(PrmRequestsOverviewAfterConfig.name, PrmRequestsOverviewAfterConfig.config)
  .component(PrmRequestServicesAfterConfig.name, PrmRequestServicesAfterConfig.config)
// .component(PrmBriefResultAfterConfig.name, PrmBriefResultAfterConfig.config)

// Pre-ES2015 code.
require('./angularLoadMonkeyPatched');
require('./prmBriefResultAfter');