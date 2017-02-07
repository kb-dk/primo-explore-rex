var app = angular.module('viewCustom', []);

app.run(['googleAnalytics', function(googleAnalytics){
  var trackingId =  'UA-77177865-1';
  googleAnalytics.initialize(trackingId);
  googleAnalytics.trackPageviews();
}]);

app.factory('googleAnalytics', ['$rootScope', '$location', '$window', function($rootScope, $location, $window) {

  var svc = {};

  var loadGa = function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })($window,$window.document,'script','https://www.google-analytics.com/analytics.js','ga');
  }

  svc.initialize = function(trackingId) {
    loadGa();
    $window.ga('create', trackingId, 'auto');
    $window.ga('set', 'anonymizeIp', true);
  }

  svc.trackPageviews = function() {
    $rootScope.$on('$locationChangeSuccess', function(event){
      $window.ga('send', 'pageview', {location: $location.url()});
    });
  }

  return svc;

}]);
