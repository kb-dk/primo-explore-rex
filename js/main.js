import { viewName } from './viewName';

import { NavigationService } from './navigation.service';
import { AnnouncementService } from './announcement.service';
import { ScriptLoaderService } from './scriptLoader.service';
import { PickUpNumbersService } from './pickUpNumbers.service';
import { LinkedPersonsService } from './linkedPersons.service';
import { GoogleAnalyticsService } from './googleAnalytics.service';
import { LocaleService } from './locale.service';

import { OpeningHoursConfig } from './openingHours.component';
import { SearchTipsConfig } from './searchTips.component';
import { AltmetricsConfig } from './altmetrics.component';
import { LinkedPersonsConfig } from './linkedPersons.component';
//import { ChatBoxConfig } from './chatBox.component';

import { PrmFinesAfterConfig } from './prmFinesAfter.component';
import { PrmLogoAfterConfig } from './prmLogoAfter.component';
import { PrmTopbarAfterConfig } from './prmTopbarAfter.component';
import { PrmSearchBarAfterConfig } from './prmSearchBarAfter.component';
import { PrmFullViewAfterConfig } from './prmFullViewAfter.component';
import { PrmPersonalInfoAfterConfig } from './prmPersonalInfoAfter.component';
import { PrmRequestsAfterConfig } from './prmRequestsAfter.component';
import { PrmRequestsOverviewAfterConfig } from './prmRequestsOverviewAfter.component';
import { PrmRequestServicesAfterConfig } from './prmRequestServicesAfter.component';
import { PrmExploreMainAfterConfig } from './prmExploreMainAfter.component';
// import { PrmBriefResultAfterConfig } from './prmBriefResultAfter.component';

angular.module('viewCustom', [
  'angularLoadMonkeyPatched',
  'ngMaterial'
])
.run(['$rootScope', ($rootScope) => {
  $rootScope.viewName = viewName;
}])
.run(['googleAnalyticsService', (googleAnalyticsService) => {
  let trackingId =  'UA-77177865-1';
  googleAnalyticsService.initialize(trackingId)
  .then(() => googleAnalyticsService.trackPageViews())
  .catch((e) => {
    console.log('Google anayltics could not be initialized.');
    console.log(e);
  });
}]);

angular.module('viewCustom')
  .service('navigationService', NavigationService)
  .service('announcementService', AnnouncementService)
  .service('scriptLoaderService', ScriptLoaderService)
  .service('pickUpNumbersService', PickUpNumbersService)
  .service('linkedPersonsService', LinkedPersonsService)
  .service('googleAnalyticsService', GoogleAnalyticsService)
  .service('localeService', LocaleService)
  .component(OpeningHoursConfig.name, OpeningHoursConfig.config)
  .component(SearchTipsConfig.name, SearchTipsConfig.config)
  .component(AltmetricsConfig.name, AltmetricsConfig.config)
  .component(LinkedPersonsConfig.name, LinkedPersonsConfig.config)
//  .component(ChatBoxConfig.name, ChatBoxConfig.config)
  .component(PrmFinesAfterConfig.name, PrmFinesAfterConfig.config)
  .component(PrmLogoAfterConfig.name, PrmLogoAfterConfig.config)
  .component(PrmTopbarAfterConfig.name, PrmTopbarAfterConfig.config)
  .component(PrmSearchBarAfterConfig.name, PrmSearchBarAfterConfig.config)
  .component(PrmFullViewAfterConfig.name, PrmFullViewAfterConfig.config)
  .component(PrmPersonalInfoAfterConfig.name, PrmPersonalInfoAfterConfig.config)
  .component(PrmRequestsAfterConfig.name, PrmRequestsAfterConfig.config)
  .component(PrmRequestsOverviewAfterConfig.name, PrmRequestsOverviewAfterConfig.config)
  .component(PrmRequestServicesAfterConfig.name, PrmRequestServicesAfterConfig.config)
  .component(PrmExploreMainAfterConfig.name, PrmExploreMainAfterConfig.config)
// .component(PrmBriefResultAfterConfig.name, PrmBriefResultAfterConfig.config)

// Pre-ES2015 code.
require('./angularLoadMonkeyPatched');
require('./prmBriefResultAfter.component');