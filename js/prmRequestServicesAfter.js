class PrmRequestServicesAfterController {

  constructor($scope, $element) {
    this.$scope = $scope;
    this.$element = $element;

    this.parentElement = this.$element.parent();
    
    // Customize the request link to be a button, and remove the redundant second link.
    // Do this when the user is logged in, and the links are properly loaded.
    this.$scope.$watch(() => this.parentCtrl.isLoggedIn() && this.parentElement[0].querySelector('.links-block-item prm-service-button button'),
      (newVal, oldVal) => {
        if (newVal && !oldVal) {
          // Find the links.
          let linkElements = this.parentElement[0].querySelectorAll('.links-block-item');

          // If there is a single link, it is the ILL link. In this case we remove prm-request-services element all together.
          if (linkElements.length == 1) {
            this.parentElement.remove();
          }
          // If there are two links, the first one should be the request link and the second the ILL link.
          else if (linkElements.length == 2) {
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