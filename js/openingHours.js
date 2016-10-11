angular.module('viewCustom').component('rexOpeningHours', {
  template: '<div id="openingHoursContainer"></div>',
  bindings: {
    parentCtrl: '<',
  },
  controller: ['angularLoad', '$scope', '$rootScope', '$location', '$window', function(angularLoad, $scope, $rootScope, $location, $window) {
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

    ctrl.$onInit = function () {

      angularLoad.loadScript('https://static.kb.dk/libcal/openingHours_min.js').then(function () {

        var locale = $location.search().lang;
        console.log('Detected locale: '+ locale);
        var i18n = (locale && (locale.toLowerCase() === "da_dk")) ? ctrl.danish_i18n : ctrl.english_i18n;        
        ctrl.openingHours = OpeningHours;


        ctrl.openingHours.config = {
          // Please notice that the view library: 'all', timespan: 'week' is to wide to put in one column!
          library: 'all', // 'all' or the library name as it is defined in LibCal (eg. 'HUM', 'KUB Nord' etc.) This can also be a comma separated list of libraries (eg. 'Den Sorte Diamant, HUM, KUB Nord'), in which case it will only show the listed libraries (and the first one in the list initially, if timespan is 'week') 
          //libraryWhitelist: ['Den Sorte Diamant', 'HUM', 'SAMF'], // Optional whitelist of all libraries that are to be shown (this option will be overriden by library, if library includes more than one library)
          timespan: 'day', // 'week' or 'day'
          colorScheme: 'standard03', // 'standard01', 'standard02', 'standard03' - used for headers if no other color is set
          allLibraryColor: '#336600', // overrides the standardColor if defined
          useLibraryColors: true, // use library specific colors (defined in libGuides) - overrides colorScheme if defined
          i18n: i18n
        };

        angularLoad.loadScript('https://api3.libcal.com/api_hours_grid.php?iid=1069&format=json&weeks=1&callback=OpeningHours.loadOpeningHours')
          .catch(function () {
            console.log('Opening hours widget data could not be loaded!');
        });

        console.log('Opening hours widget loaded successfully!');
        return true;

      }).catch(function () {
        console.log('Opening hours widget could not be loaded!');
        return false;
      });

    };

    ctrl.$onDestroy = function () {
      $window.OpeningHours = null;
      ctrl.openingHours = null;

      removeJsCssFile('openingHours_min.js', 'js');
      removeJsCssFile('openingHoursStyles_min.js', 'css');
      console.log('Opening hours widget destroyed!.');
    };

    $rootScope.$on('$locationChangeSuccess', function(event, newLoc, oldLoc)  {
      var oldLangParam = oldLoc.split(/\?|&/).find(function (str) {return str.includes('lang=');} )
      var newLangParam = newLoc.split(/\?|&/).find(function (str) {return str.includes('lang=');} )
      
      if( $location.path() === '/search' && oldLangParam && oldLangParam !== newLangParam)
        $window.location.reload();
    });

    // See http://stackoverflow.com/questions/9425910/load-and-unload-javascript-at-runtime/9425964#9425964
    function removeJsCssFile(fileName, fileType)  {
      var targetElement=(fileType=="js")? "script" : (fileType=="css")? "link" : "none" //determine element type to create nodelist from
      var targetAttr=(fileType=="js")? "src" : (fileType=="css")? "href" : "none" //determine corresponding attribute to test for
      var allSuspects=document.getElementsByTagName(targetElement)
      for (var i = allSuspects.length; i>=0; i--) { //search backwards within nodelist for matching elements to remove
        if (allSuspects[i] && allSuspects[i].getAttribute(targetAttr)!=null && allSuspects[i].getAttribute(targetAttr).indexOf(fileName)!=-1)
          allSuspects[i].parentNode.removeChild(allSuspects[i]) //remove element by calling parentNode.removeChild()
      }
    }


  }],
});