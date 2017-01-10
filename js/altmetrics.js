angular.module('viewCustom').controller('altmetricsController', [
  'scriptLoader',
  '$window',
  function(scriptLoader, $window) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.loadBadge().catch((e) => console.log(e.message));
    };

    /**
     *  Method to load the altmetrics badge.
     *  @return {Promise} A Promise to be fulfilled if the badge is loaded, 
     *  and to be rejected if it could not be loaded.
     */
    ctrl.loadBadge = function() {
      if (ctrl.doi) {
        return scriptLoader.load('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');
      } else {
        return Promise.reject(Error('REX: Altmetrics badge cannot be loaded as no DOI is present.'));
      }
    };

    ctrl.$onDestroy = function() {
      // TODO: Remove any other JS or CSS files that are loaded.
      // TODO: Remove the added properties and global variables. 
      // if (_altmetric) _altmetric = null;
      // if ($window._altmetric) $window._altmetric = null;

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
  },
  controller: 'altmetricsController',
});