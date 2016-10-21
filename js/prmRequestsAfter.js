angular.module('viewCustom').controller('prmRequestsAfterController', ['$scope', '$http', '$element', function ($scope, $http, $element) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
  };

  $scope.$watch(angular.bind(ctrl, function () {
    return ctrl.parentCtrl.requestsDisplay.length;
  }), function (newVal, oldVal) {
      if(newVal !== 0 && newVal !== oldVal) {
        retrievePickUpNumbers();     
      }
  });

  function retrievePickUpNumbers() {
    var itemsToCheck = ctrl.parentCtrl.requestsDisplay.filter( (item) => { return item.isCancelable; } )

    // console.log(itemsToCheck);
    // console.log(ctrl.parentCtrl.requestsDisplay.length);
    // console.log(ctrl.parentCtrl.requestsDisplay);
    for(var i = 0; i < itemsToCheck.length; i++) {
      var item = itemsToCheck[i];
      var itemId = item.requestId.slice(-19);

      $http.get('https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=' + itemId)
      .then(function successCallback(response) {
        console.log(response.data);
        item.secondLineRight += response.data.split(/<body>|<\/body>/)[1];
        console.log('h3[value="'+ item.firstLineLeft +'"]');
        console.log(document.querySelectorAll("h3[value='"+ item.firstLineLeft +"']"));

        console.log(item);
      }, function errorCallback(response) {
        console.log('REX: Could not retrieve the pick up number.');
        console.log(response);
      });
    }    
  }




}]);
  
angular.module('viewCustom').component('prmRequestsAfter',{
  bindings: { parentCtrl: '<' },
  controller: 'prmRequestsAfterController',
});






// https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0078814230000100001

// angular.element($0).scope().ctrl.requestsDisplay[0].requestId.slice(-19)