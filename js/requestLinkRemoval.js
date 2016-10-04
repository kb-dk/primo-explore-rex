angular.module('viewCustom').factory('requestLinkRemoval', function() {
  return function (ctrl) {
    // Remove the request link if the user is logged in. Otherwise, an authentication warning will appear in its place.
    if(!ctrl.isLoggedIn())  return false;

    var element = angular.element(document).find('prm-request-services');
    element.parent().parent().find('md-divider').remove();
    element.remove();
    return true;      
  
  };
});