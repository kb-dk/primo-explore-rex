import { viewName } from './viewName';

import { NavigationService } from './navigation.service';
import { AnnouncementService } from './announcement.service';
import { ScriptLoaderService } from './scriptLoader.service';
import { SectionOrderingService } from './sectionOrdering.service';
import { PickUpNumbersService } from './pickUpNumbers.service';
import { LinkedPersonsService } from './linkedPersons.service';
import { GoogleAnalyticsService } from './googleAnalytics.service';
import { LocaleService } from './locale.service';

import { OpeningHoursConfig } from './openingHours';
import { SearchTipsConfig } from './searchTips';
import { AltmetricsConfig } from './altmetrics';
import { LinkedPersonsConfig } from './linkedPersons.component';

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
])
.run(['$rootScope', ($rootScope) => {
  $rootScope.viewName = viewName;
}])
.run(['googleAnalytics', (googleAnalytics) => {
  let trackingId =  'UA-77177865-1';
  googleAnalytics.initialize(trackingId)
  .then(() => googleAnalytics.trackPageViews())
  .catch((e) => {
    console.log('Google anayltics could not be initialized.');
    console.log(e);
  });
}]);

angular.module('viewCustom').service('navigation', NavigationService)
  .service('announcement', AnnouncementService)
  .service('scriptLoader', ScriptLoaderService)
  .service('sectionOrdering', SectionOrderingService)
  .service('pickUpNumbers', PickUpNumbersService)
  .service('linkedPersonsService', LinkedPersonsService)
  .service('googleAnalytics', GoogleAnalyticsService)
  .service('locale', LocaleService)
  .component(OpeningHoursConfig.name, OpeningHoursConfig.config)
  .component(SearchTipsConfig.name, SearchTipsConfig.config)
  .component(AltmetricsConfig.name, AltmetricsConfig.config)
  .component(LinkedPersonsConfig.name, LinkedPersonsConfig.config)
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