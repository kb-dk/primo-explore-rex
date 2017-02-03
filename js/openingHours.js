/**
 * The opening hours widget component controller. 
 */
class OpeningHoursController {

  constructor(scriptLoader, $interval, $rootScope, $locale, $window) {
    this.scriptLoader = scriptLoader;
    this.$interval = $interval;
    this.$rootScope = $rootScope;
    this.$locale = $locale;
    this.$window = $window;
  }

  $onInit() {

    this._danish_i18n = {
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
      'The Black Diamond - Reading Rooms': 'Diamantens læsesale',
      'CUL South Campus': 'KUB Søndre Campus',
      ampm: false
    };

    this._english_i18n = {
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
      byAppointment: 'By appointment',
      'Diamantens læsesale': 'The Black Diamond - Reading Rooms',
      'Den Sorte Diamant': 'The Black Diamond',
      'KUB Nord': 'CUL North Campus',
      ampm: false
    };

    this.loadOpeningHoursWidget();

  };

  $onDestroy() {
    this.$window.loadAdditionalJavascript = null;
    this.$window.OpeningHours = null;
    delete this.$window.openingHours;
    delete this._openingHours;
        
    this.$window.document.getElementById("openingHoursModalDiv").outerHTML = "";
    
    this.scriptLoader.unload('callback=OpeningHours.loadOpeningHours', 'js');
    this.scriptLoader.unload('callback=OpeningHours.initializeGMaps', 'js');
    this.scriptLoader.unload('openingHours_min.js', 'js');
    this.scriptLoader.unload('openingHoursStyles_min.css', 'css');

    console.log('Opening hours widget destroyed!.');
  };

  /**
   * Method to load the opening hours widget. 
   */
  loadOpeningHoursWidget() {

    this.scriptLoader.load('https://static.kb.dk/libcal/openingHours_min.js').then(() => {

      let i18n = (this.$locale.localeID === "da_DK") ? this._danish_i18n : this._english_i18n;

      this._openingHours = OpeningHours;

      if (!this._openingHours) throw 'Opening hours widget could not be loaded!';

      this._openingHours.config = {
        // Please notice that the view library: 'all', timespan: 'week' is to wide to put in one column!
        library: 'all', // 'all' or the library name as it is defined in LibCal (eg. 'HUM', 'KUB Nord' etc.) This can also be a comma separated list of libraries (eg. 'Den Sorte Diamant, HUM, KUB Nord'), in which case it will only show the listed libraries (and the first one in the list initially, if timespan is 'week') 
        // libraryWhitelist: ['Den Sorte Diamant', 'Diamantens læsesale', 'TEOL', 'SAMF'], // Optional whitelist of all libraries that are to be shown (this option will be overriden by library, if library includes more than one library)
        timespan: 'day', // 'week' or 'day'
        colorScheme: 'standard03', // 'standard01', 'standard02', 'standard03' - used for headers if no other color is set
        allLibraryColor: '#6a6864', // overrides the standardColor if defined
        useLibraryColors: true, // use library specific colors (defined in libGuides) - overrides colorScheme if defined
        i18n: i18n
      };

      this.scriptLoader.load('https://api3.libcal.com/api_hours_grid.php?iid=1069&format=json&weeks=1&callback=OpeningHours.loadOpeningHours')
        .catch(() => {
          console.log('Opening hours data could not be loaded!');
        });

      console.log('Opening hours widget loaded successfully!');

    }).catch(() => {
      console.log('Opening hours widget could not be loaded!');
    });
  }

}

OpeningHoursController.$inject = ['scriptLoader', '$interval', '$rootScope', '$locale', '$window'];

export let OpeningHoursConfig = {
  name: 'rexOpeningHours',
  config: {
    template: '<div id="openingHoursContainer"></div>',
    bindings: {
      parentCtrl: '<',
    },
    controller: OpeningHoursController,
  }
}