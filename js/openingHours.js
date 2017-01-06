angular.module('viewCustom').controller('openingHoursController', [
  'scriptLoader',
  '$interval',
  '$rootScope',
  '$locale',
  '$window',
  function(scriptLoader, $interval, $rootScope, $locale, $window) {

    var ctrl = this;

    ctrl.$onInit = function() {

      ctrl.danish_i18n = {
        library: 'Bibliotek',
        openHourToday: 'Dagens Åbningstid',
        openHour: 'Åbningstid',
        closed: 'Lukket',
        allDay: 'Døgnåbent',
        weekdays: ['Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag', 'Søndag'],
        weekdaysAbbr: ['man', 'tirs', 'ons', 'tors', 'fre', 'lør', 'søn'],
        info: 'Info',
        map: 'Kort',
        allWeek: 'Hele ugen',
        allLibraries: 'Alle biblioteker',
        ampm: false
      };

      ctrl.english_i18n = {
        library: 'Library',
        openHourToday: 'Open',
        openHour: 'Opening hours',
        closed: 'Closed',
        weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        weekdaysAbbr: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
        info: 'Info',
        map: 'Map',
        allWeek: 'All Week',
        allLibraries: 'All Libraries',
        ampm: false
      };

      loadOpeningHoursWidget();

      // Try to load the widget every 2 seconds, for another 3 times.
      ctrl.widgetPromise = $interval(loadOpeningHoursWidget, 2000, 3);

    };

    ctrl.$onDestroy = function() {
      $interval.cancel(ctrl.widgetPromise);

      $window.OpeningHours = null;
      ctrl.openingHours = null;

      scriptLoader.unload('openingHours_min.js', 'js');
      scriptLoader.unload('openingHoursStyles_min.js', 'css');

      console.log('Opening hours widget destroyed!.');
    };

    /**
     * Function that loads the opening hours widget. 
     */
    function loadOpeningHoursWidget() {

      // Stop trying to load the widget, if it is already loaded.
      if (ctrl.openingHours) {
        $interval.cancel(ctrl.widgetPromise);
        return;
      }

      scriptLoader.load('https://static.kb.dk/libcal/openingHours_min.js').then(function() {

        var i18n = ($locale.localeID === "da_DK") ? ctrl.danish_i18n : ctrl.english_i18n;

        ctrl.openingHours = OpeningHours;

        if (!ctrl.openingHours) throw 'Opening hours widget could not be loaded!';

        ctrl.openingHours.config = {
          // Please notice that the view library: 'all', timespan: 'week' is to wide to put in one column!
          library: 'all', // 'all' or the library name as it is defined in LibCal (eg. 'HUM', 'KUB Nord' etc.) This can also be a comma separated list of libraries (eg. 'Den Sorte Diamant, HUM, KUB Nord'), in which case it will only show the listed libraries (and the first one in the list initially, if timespan is 'week') 
          //libraryWhitelist: ['Den Sorte Diamant', 'HUM', 'SAMF'], // Optional whitelist of all libraries that are to be shown (this option will be overriden by library, if library includes more than one library)
          timespan: 'day', // 'week' or 'day'
          colorScheme: 'standard03', // 'standard01', 'standard02', 'standard03' - used for headers if no other color is set
          allLibraryColor: '#6a6864', // overrides the standardColor if defined
          useLibraryColors: true, // use library specific colors (defined in libGuides) - overrides colorScheme if defined
          i18n: i18n
        };

        scriptLoader.load('https://api3.libcal.com/api_hours_grid.php?iid=1069&format=json&weeks=1&callback=OpeningHours.loadOpeningHours')
          .catch(function() {
            console.log('Opening hours data could not be loaded!');
          });

        console.log('Opening hours widget loaded successfully!');

      }).catch(function() {
        console.log('Opening hours widget could not be loaded!');
      });
    }

  }
]);

/**
 * The opening hours widget component. 
 */
angular.module('viewCustom').component('rexOpeningHours', {
  template: '<div id="openingHoursContainer"></div>',
  bindings: {
    parentCtrl: '<',
  },
  controller: 'openingHoursController',
});