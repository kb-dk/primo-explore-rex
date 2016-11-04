angular.module('viewCustom').factory('navigation', ['$location', '$window', function($location, $window) {
  
  return {

    navigateTo: function(url) {      
      if(url === "")
        ctrl.navigateToHomePage();
      else 
        $window.open(url, '_blank');
    },

    navigateToHomePage: function() {
      var params = $location.search();
      var vid = params.vid || globalViewName;
      var lang = params.lang || "da_DK";
      var baseUrl = $location.absUrl().split('?')[0];
      $window.location.href = baseUrl + '?vid=' + vid + '&lang=' + lang;
    }

  }
  
}]);