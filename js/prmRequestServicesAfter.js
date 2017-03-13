class PrmRequestServicesAfterController {

  constructor($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;
  }

  $onInit() {

    this.parentElement = this.$element.parent();

    // Customize the request link to be a button, and remove the redundant second link.
    // Do this when the user is logged in, and the links are properly loaded.
    this.$scope.$watch(() => this.parentCtrl.isLoggedIn() && this.parentElement[0].querySelector('.links-block-item prm-service-button button'),
      (newVal, oldVal) => {
        if (newVal && !oldVal) {
          // Find the links.
          let linkElements = this.parentElement[0].querySelectorAll('.links-block-item');

          // It seems that there should always be two matched links,
          // if not, log it but do not throw an exception
          // as the code might still do the job.
          if (linkElements.length != 2) {
            console.log('An unhandled case is encountered in prm-request-services.');
          }

          // If the first link is the ILL link, 
          // we remove prm-request-services element all together.
          if (linkElements[0].querySelector('span[translate="ILL"]')) {
            this.parentElement.remove();
          }
          // Else, the first one should be the request link 
          // and the second the ILL link.
          else {
            // Customize the request link to be a button.
            angular.element(linkElements[0]).find('button').removeClass('button-as-link');
            angular.element(linkElements[0]).find('button').addClass('request-button');

            // Remove the redundant ILL link.
            linkElements[1].remove();
          }
        }
      }
    );

  }

}

PrmRequestServicesAfterController.$inject = ['$scope', '$element'];

export let PrmRequestServicesAfterConfig = {
  name: 'prmRequestServicesAfter',
  config: {
    bindings: {
      parentCtrl: '<',
    },
    controller: PrmRequestServicesAfterController
  }
}