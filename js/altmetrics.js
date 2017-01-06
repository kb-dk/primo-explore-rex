angular.module('viewCustom').controller('altmetricsController', [
  'scriptLoader',
  function(scriptLoader) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.doi = ctrl.parentCtrl.parentCtrl.item.pnx.addata.doi[0];
      console.log(ctrl.doi);
      ctrl.loadBadge();
    };

    /**
     * 
     *  @return {Promise} A Promise to be fulfilled if the badge is loaded, 
     *  and to be rejected if it could not be loaded.
     */
    ctrl.loadBadge = function() {
      return new Promise(function(resolve, reject) {
        if (ctrl.doi) {
          scriptLoader.load('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');
          resolve();
        } else {
          reject('Altmetrics badge cannot be loaded as no DOI is present.');
        }
      });
    };

    ctrl.$onDestroy = function() {
      // TODO: Remove any other JS or CSS files that are be loaded.
      // TODO: Remove the added properties and global variables. 
      scriptLoader.unload('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js', 'js');
      // scriptLoader.unload('openingHoursStyles_min.js', 'css');

      console.log('Opening hours widget destroyed!.');
    };


  }
]);

/**
 * The altmetrics component.
 */
angular.module('viewCustom').component('rexAltmetrics', {
  template: '<div ng-if="$ctrl.doi" class="altmetric-embed" data-badge-type="medium-donut" data-badge-details="right" data-doi="{{$ctrl.doi}}"></div>',
  bindings: {
    parentCtrl: '<',
  },
  controller: 'altmetricsController',
});