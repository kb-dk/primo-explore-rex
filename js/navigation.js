/**
 * A service handling navigation logic. 
 */
angular.module('viewCustom').service('navigation', [
  '$location',
  '$window',
  function($location, $window) {

    /**
     * Opens the given url in a new tab, 
     * or navigates to the home page if the url is blank.
     * @param {string} url- The URL to be navigated to.
     */
    this.navigateTo = function(url) {
      if (typeof url === 'undefined' || url === "")
        ctrl.navigateToHomePage();
      else
        $window.open(url, '_blank');
    };

    /**
     * Navigates to the home page with a reload.
     * @return {boolean} Booelan value indicating if the navigation was successful.
     */
    this.navigateToHomePage = function() {
      var params = $location.search();
      var vid = params.vid || globalViewName;
      var lang = params.lang || "da_DK";
      var split = $location.absUrl().split('/primo-explore/');

      if (split.length === 1) {
        console.log(split[0] + ' : Could not detect the view name!');
        return false;
      }

      var baseUrl = split[0];
      $window.location.href = baseUrl + '/primo-explore/search?vid=' + vid + '&lang=' + lang;
      return true;
    };

  }
]);