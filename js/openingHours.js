angular.module('viewCustom').component('rexOpeningHours', {
  template: '<div id="openingHoursContainer"></div>',
  controller: ['angularLoad', function(angularLoad) { // $scope, $element, $attrs, 
    var ctrl = this;
    
    ctrl.danish_i18n = {
      library: 'Bibliotek',
      openHourToday: 'Dagens Åbningstid',
      openHour: 'Åbningstid',
      closed: 'Lukket',
      allDay: 'Døgnåbent',
      weekdays: ['Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag','Søndag'],
      weekdaysAbbr: ['man','tirs','ons','tors','fre','lør','søn'],
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
      weekdays: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      weekdaysAbbr: ['mon','tue','wed','thu','fri','sat','sun'],
      info: 'Info',
      map: 'Map',
      allWeek: 'All Week',
      allLibraries: 'All Libraries',
      ampm: false
    };

    ctrl.openingHours = null;

    ctrl.$onInit = function () {
      console.log('Before loading the widget.');
      angularLoad.loadScript('http://static.kb.dk/libcal/openingHours_min.js').then(function () {
        ctrl.openingHours = OpeningHours;

        ctrl.openingHours.config = {
          // Please notice that the view library: 'all', timespan: 'week' is to wide to put in one column!
          library: 'Den Sorte Diamant', // 'all' or the library name as it is defined in LibCal (eg. 'HUM', 'KUB Nord' etc.) This can also be a comma separated list of libraries (eg. 'Den Sorte Diamant, HUM, KUB Nord'), in which case it will only show the listed libraries (and the first one in the list initially, if timespan is 'week') 
          //libraryWhitelist: ['Den Sorte Diamant', 'HUM', 'SAMF'], // Optional whitelist of all libraries that are to be shown (this option will be overriden by library, if library includes more than one library)
          timespan: 'day', // 'week' or 'day'
          colorScheme: 'standard03', // 'standard01', 'standard02', 'standard03' - used for headers if no other color is set
          allLibraryColor: '#336600', // overrides the standardColor if defined
          useLibraryColors: true, // use library specific colors (defined in libGuides) - overrides colorScheme if defined
          i18n: ctrl.english_i18n
        }
      });

      angularLoad.loadScript('https://api3.libcal.com/api_hours_grid.php?iid=1069&format=json&weeks=1&callback=OpeningHours.loadOpeningHours')
      console.log('After loading the widget.');
    };

    ctrl.$onDestroy = function () {
      console.log('Destroying the widget.');
      ctrl.openingHours = null;
      // OpeningHours = null;
    };
  }],
});