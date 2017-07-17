/**
 * The altmetrics component controller.
 */
class AltmetricsController {

  constructor(scriptLoaderService, $window, $http) {
    this.scriptLoaderService = scriptLoaderService;
    this.$window = $window;
    this.$http = $http;
  }

  $onInit() {
    return this.loadBadge().then(this.onLoad).catch((e) => console.log(e));
  }

  /**
   *  Method to load the altmetrics badge.
   *  @return {Promise} A Promise to be fulfilled if the badge is loaded, 
   *  and to be rejected if it could not be loaded.
   */
  loadBadge() {
    let ctrl = this;
    return new Promise((resolve, reject) => {
      if (ctrl.doi) {
        ctrl.$http.get('https://api.altmetric.com/v1/doi/' + ctrl.doi).then(() => {
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

  loadBadgeScript() {
    return this.scriptLoaderService.load('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');
  };

  $onDestroy() {
    if (this.$window._altmetric) {
      delete this.$window._altmetric;
    }

    // TODO: Remove any other JS or CSS files that are loaded. The URLs below may change!
    this.scriptLoaderService.unload('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js', 'js');
    this.scriptLoaderService.unload('https://d1bxh8uas1mnw7.cloudfront.net/assets/altmetric_badges-8f271adb184c21cc5169a7f67f7fe5ab.js', 'js');
    this.scriptLoaderService.unload('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed-2c47105b6381604898bbf8ae8a680350.css', 'css');

    console.log('REX: Altmetrics badge is destroyed!.');
  };
};

AltmetricsController.$inject = ['scriptLoaderService', '$window', '$http'];

export let AltmetricsConfig = {
  name: 'rexAltmetrics',
  config: {
    // template: '<div ng-if="$ctrl.doi" data-badge-type="donut" class="altmetric-embed" data-badge-popover="left" data-doi="{{$ctrl.doi}}"></div>',
    template: '<div ng-if="$ctrl.doi" class="altmetric-embed" data-badge-type="medium-donut" data-badge-details="right" data-doi="{{$ctrl.doi}}"></div>',
    bindings: {
      doi: '<',
      onLoad: '&',
    },
    controller: AltmetricsController,
  }
}