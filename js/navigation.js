angular.module('viewCustom').factory('navigation', ['$location', '$window', function($location, $window) {

  return {

    navigateTo: function(url) {
      if (url === "")
        ctrl.navigateToHomePage();
      else
        $window.open(url, '_blank');
    },

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