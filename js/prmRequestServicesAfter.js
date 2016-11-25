angular.module('viewCustom').controller('prmRequestServicesAfterController', ['$scope', '$element', function($scope, $element) {
  var ctrl = this;
  ctrl.parentElement = $element.parent();

  // Customize the request link to be a button, and remove the redundant second link.
  $scope.$watch(angular.bind(ctrl, function() {
    // Do this when the user is logged in, and the links are properly loaded.
    return ctrl.parentCtrl.isLoggedIn() && ctrl.parentElement[0].querySelector('.links-block-item prm-service-button button');
  }), function(newVal, oldVal) {

    if (newVal && !oldVal) {
      // Find the links.
      var linkElements = ctrl.parentElement[0].querySelectorAll('.links-block-item');

      // If there is a single link, it is the ILL link. In this case we remove prm-request-services element all together.
      if (linkElements.length == 1) {
        ctrl.parentElement.remove();
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

  });

}]);

angular.module('viewCustom').component('prmRequestServicesAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: 'prmRequestServicesAfterController'
});