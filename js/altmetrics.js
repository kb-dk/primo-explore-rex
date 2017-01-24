angular.module('viewCustom').controller('altmetricsController', [
  'scriptLoader',
  '$window',
  '$http',
  function(scriptLoader, $window, $http) {
    var ctrl = this;

    ctrl.$onInit = function() {
      return ctrl.loadBadge().then(ctrl.onLoad).catch((e) => console.log(e));
    };

    /**
     *  Method to load the altmetrics badge.
     *  @return {Promise} A Promise to be fulfilled if the badge is loaded, 
     *  and to be rejected if it could not be loaded.
     */
    ctrl.loadBadge = function() {
      return new Promise((resolve, reject) => {
        if (ctrl.doi) {
          $http.get('https://api.altmetric.com/v1/doi/' + ctrl.doi).then(() => {
            try {
              ctrl.loadBadgeScript();
            } catch (e) {
              console.log(e);
              reject('Altmetrics onLoad error.');
              return;
            }
            resolve();
          }).catch((e) =>
            reject('REX: Altmetrics badge cannot be loaded.')
          );
        } else {
          reject('REX: Altmetrics badge cannot be loaded as no DOI is present.');
        }
      });
    };


    ctrl.loadBadgeScript = () => {
      return scriptLoader.load('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');
    };

    ctrl.$onDestroy = function() {
      if ($window._altmetric) {
        delete $window._altmetric;
      }

      // TODO: Remove any other JS or CSS files that are loaded. The URLs below may change!
      scriptLoader.unload('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js', 'js');
      scriptLoader.unload('https://d1bxh8uas1mnw7.cloudfront.net/assets/altmetric_badges-8f271adb184c21cc5169a7f67f7fe5ab.js', 'js');
      scriptLoader.unload('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed-2c47105b6381604898bbf8ae8a680350.css', 'css');

      console.log('REX: Altmetrics badge is destroyed!.');
    };

  }
]);

/**
 * The altmetrics component.
 */
angular.module('viewCustom').component('rexAltmetrics', {
  // template: '<div ng-if="$ctrl.doi" data-badge-type="donut" class="altmetric-embed" data-badge-popover="left" data-doi="{{$ctrl.doi}}"></div>',
  template: '<div ng-if="$ctrl.doi" class="altmetric-embed" data-badge-type="medium-donut" data-badge-details="right" data-doi="{{$ctrl.doi}}"></div>',
  bindings: {
    doi: '<',
    onLoad: '&',
  },
  controller: 'altmetricsController',
});