angular.module('viewCustom').controller('prmRequestServicesAfterController', ['$scope', '$element', function($scope, $element) {
  var ctrl = this;
  ctrl.parentElement = $element.parent();

  // Customize the request link to be a button, and remove the redundant second link.
  $scope.$watch(angular.bind(ctrl, function() {
    // Do this when the user is logged in, and the links are properly loaded.
    return ctrl.isLoggedIn() && ctrl.parentElement[0].querySelector('.links-block-item prm-service-button button');
  }), function(newVal, oldVal) {

    if (newVal && !oldVal) {
      // Find the links.
      var linkElements = ctrl.parentElement[0].querySelectorAll('.links-block-item');
      
      // Customize the request link to be a button.
      angular.element(linkElements[0]).find('button').removeClass('button-as-link');
      angular.element(linkElements[0]).find('button').addClass('request-button');

      // Remove the redundant link.
      linkElements[1].remove();
    }

  });

}]);

angular.module('viewCustom').component('prmRequestServicesAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: 'prmRequestServicesAfterController'
});