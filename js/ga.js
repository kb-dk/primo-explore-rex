/**
 * A service that injects the google analytics. 
 */
export class GoogleAnalyticsService {
  constructor($rootScope, $location, $window) {
    this.$rootScope = $rootScope;
    this.$location = $location;
    this.$window = $window;
  }

  /**
   * Initialize google analytics.
   * @param {string} trackingId - The GA tracking ID for our application.
   * @return {Promise} Promise that resolves if GA is initialized properly, 
   *  and rejects if it fails to do so.
   **/
  initialize(trackingId) {
    let ctrl = this;

    return new Promise((resolve, reject) => {
      ctrl._loadGa();
      ctrl.$window.ga('create', trackingId, 'auto');
      ctrl.$window.ga('set', 'anonymizeIp', true);
      resolve();
    });
  
  }

  /**
   * Enable tracking of the page views.
   **/
  trackPageViews() {
    let ctrl = this;

    ctrl.$rootScope.$on('$locationChangeSuccess', function(event){
      ctrl.$window.ga('send', 'pageview', {location: ctrl.$location.url()});
    });
  }

  _loadGa() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(this.$window,this.$window.document,'script','https://www.google-analytics.com/analytics.js','ga');
  }

} 

GoogleAnalyticsService.$inject = ['$rootScope', '$location', '$window'];