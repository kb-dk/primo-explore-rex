angular.module('viewCustom').factory('navigation', ['$location', '$window', '$rootScope', function($location, $window, $rootScope) {

  // If the user navigates back to the home page without a refresh, enfore a page reload. 
  // This is needed when the user navigates back from 'My Favorites',
  // or changes the language on the home page.
  $rootScope.$on('$locationChangeSuccess', function(event, newLoc, oldLoc) {
    function langParam(url) {
      return url.split(/\?|&/).find(function(str) {
        return str.includes('lang=');
      });
    }

    function path(url) {
      var splitUrl = url.split(/\/primo-explore|\?/);

      if (splitUrl.length < 2)
        return false;
      else
        return splitUrl[1];
    }

    var oldLangParam = langParam(oldLoc);
    var newLangParam = langParam(newLoc);
    var oldPath = path(oldLoc);
    var newPath = path(newLoc);

    if (newPath === '/search' && (newPath !== oldPath || (oldLangParam && oldLangParam !== newLangParam)))
      $window.location.reload();
  });

  return {

    navigateTo: function(url) {
      if (url === "")
        ctrl.navigateToHomePage();
      else
        $window.open(url, '_blank');
    },

    // TODO: Should we use $locale service instead of extracting the code from the URL?  
    navigateToHomePage: function() {
      var params = $location.search();
      var vid = params.vid || globalViewName;
      var lang = params.lang || "da_DK";
      var split = $location.absUrl().split('/primo-explore/');

      if (split.length === 1) return console.log(split[0] + ' : The URL cannot be navigated from properly!');

      var baseUrl = split[0];
      $window.location.href = baseUrl + '/primo-explore/search?vid=' + vid + '&lang=' + lang;

    }

  }

}]);