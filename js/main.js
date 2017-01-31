require('./angularLoadMonkeyPatched');

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

let app = angular.module('viewCustom', [
  'angularLoadMonkeyPatched',
  'ngMaterial'
]).run(['$rootScope', function($rootScope) {
  $rootScope.viewName = viewName;
}]);

app.service('navigation', NavigationService);
app.service('announcement', AnnouncementService);
app.service('scriptLoader', ScriptLoaderService);
app.service('sectionOrdering', SectionOrderingService);
app.service('pickUpNumbers', PickUpNumbersService);

app.component(OpeningHoursConfig.name, OpeningHoursConfig.config);
app.component(SearchTipsConfig.name, SearchTipsConfig.config);
app.component(AltmetricsConfig.name, AltmetricsConfig.config);

app.component(PrmFinesAfterConfig.name, PrmFinesAfterConfig.config);
app.component(PrmLogoAfterConfig.name, PrmLogoAfterConfig.config);
app.component(PrmTopbarAfterConfig.name, PrmTopbarAfterConfig.config);
app.component(PrmSearchBarAfterConfig.name, PrmSearchBarAfterConfig.config);
app.component(PrmFullViewAfterConfig.name, PrmFullViewAfterConfig.config);
app.component(PrmPersonalInfoAfterConfig.name, PrmPersonalInfoAfterConfig.config);
app.component(PrmRequestsAfterConfig.name, PrmRequestsAfterConfig.config);
app.component(PrmRequestsOverviewAfterConfig.name, PrmRequestsOverviewAfterConfig.config);
app.component(PrmRequestServicesAfterConfig.name, PrmRequestServicesAfterConfig.config);
// app.component(PrmBriefResultAfterConfig.name, PrmBriefResultAfterConfig.config);

require('./prmBriefResultAfter');