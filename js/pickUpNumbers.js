angular.module('viewCustom').factory('pickUpNumbers', ['$http', '$location', function($http, $location) {
  
  return {

    insertPickUpNumbers: function (requests) {
      var itemsToCheck = requests.filter( (item) => { return item.isCancelable; } )

      for(var i = 0; i < itemsToCheck.length; i++) {
        var item = itemsToCheck[i];
        var itemId = item.requestId.slice(-19);

        // Retrieving the pick up numbers from the associated service. 
        // Request URI should look like the following.
        // https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0078814230000100001
        $http.get($location.protocol()+'://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=' + itemId)
        .then(function successCallback(response) {
          // console.log(response);          
          // Replacing the redundant request ID field with the pickup number.
          item.expandedDisplay[0].label = "request.bookings.pick_up_shelf";
          item.expandedDisplay[0].data = response.data.split(/<body>-|<\/body>/)[1];

        }, function errorCallback(response) {
          console.log('REX: Could not retrieve the pick up number.');
          console.log(response);
        });
      }    

      // Property representing if the pickup numbers were inserted. 
      // This value cues us if the insertion should be repeated.
      requests.pickUpNumbersInserted = true;

    }
  }
  
}]);