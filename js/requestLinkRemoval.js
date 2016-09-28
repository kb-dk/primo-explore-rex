angular.module('viewCustom').factory('requestLinkRemoval', function() {
  return function () {
    console.log('requestLinkRemoval hit!');
    
    // Remove the request link and the divider right below.
    var element = angular.element(document).find('prm-request-services');
    element.parent().parent().find('md-divider').remove();
    element.remove();      

  };
});

