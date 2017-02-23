import { viewName } from './viewName';

/**
 * A service handling navigation logic. 
 */
export class NavigationService {
  
  constructor($location, $window) {
    this.$location = $location;
    this.$window = $window;
  }

  /**
   * Opens the given url in a new tab, 
   * or navigates to the home page if the url is blank.
   * @param {string} url- The URL to be navigated to.
   */
  navigateTo(url) {
    if (typeof url === 'undefined' || url === "")
      this.navigateToHomePage();
    else
      this.$window.open(url, '_blank');
  };

  /**
   * Navigates to the home page with a reload.
   * @return {boolean} Booelan value indicating if the navigation was successful.
   */
  navigateToHomePage() {
    let params = this.$location.search();
    let vid = params.vid || viewName;
    let lang = params.lang || "da_DK";
    let split = this.$location.absUrl().split('/primo-explore/');

    if (split.length === 1) {
      console.log('Could not process the URL : ' + split[0]);
      return false;
    }

    let baseUrl = split[0];
    this.$window.location.href = baseUrl + '/primo-explore/search?vid=' + vid + '&lang=' + lang;
    return true;
  };

}

NavigationService.$inject = ['$location', '$window'];