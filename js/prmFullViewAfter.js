angular.module('viewCustom').component('prmFullViewAfter', {
  bindings: {
    parentCtrl: '<',
  },
  controller: ['sectionOrdering', 'requestLinkRemoval', '$element', '$scope', function(sectionOrdering, requestLinkRemoval, $element, $scope) {
    var ctrl = this;

    ctrl.$onInit = function () {
      sectionOrdering(ctrl.parentCtrl.services);
      // requestLinkRemoval($element);

      // ctrl.parentCtrl;

      // console.log('requestLinkRemoval hit!');
      // var request_services_element = angular.element(document).find('prm-request-services-after');
      // // console.log(request_services_element.toString());
      // request_services_element.addClass('to-be-removed');
      // compile(request_services_element);


    };

    // function compile(element) {
    //   var el = element;    
    //   $scope = el.scope();
    //   var injector = el.injector();
    //   injector.invoke(function($compile){
    //     $compile(el, $scope)
    //   })     
    // }


  }]
});