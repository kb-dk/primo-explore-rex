// Service inserting the pick up numbers for the requested items.
angular.module('viewCustom').factory('pickUpNumbers', ['$http', '$location', function($http, $location) {
  
  return {

    insertPickUpNumbers: function (targetContainer, requests, selector) {

        var targetElements = selector(targetContainer);
  
        requests.forEach(function (requestItem) {
          var requestId = requestItem.requestId;
          var regex = requestId +"$"

          // The DOM element containing the request ID of the item.
          var matchedElement = Array.prototype.find.call(targetElements, (target) => {return target.textContent.match(new RegExp(regex))} );
          
          // The requested item can only have a pick up number if it has a hold deadline.
          if(requestItem.expandedDisplay.find((field) => field.label === "request.holds.end_hold_date"))
            // Retrieving the pick up numbers from the associated service. 
            // Request URI should look like the following.
            // https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0078814230000100001
            $http.get($location.protocol()+'://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=' + requestId.slice(-19))
              .then(successCallback, errorCallback);
          else
            matchedElement.textContent = matchedElement.textContent.replace("-"+requestId, "");

          // The callback function for a successful retrieval. 
          function successCallback(response) {
            var pickUpNumber = response.data.split(/<body>|<\/body>/)[1];
            matchedElement.textContent = matchedElement.textContent.replace("-"+requestId, pickUpNumber);
          };

          // The callback function for a failed retrieval.
          function errorCallback(response) {
            console.log('REX: Could not retrieve the pick up number.');
            console.log(response);
          };

        });

      // Property representing if the pickup numbers have been inserted. 
      // This value cues us if the insertion should be repeated.
      requests.pickUpNumbersInserted = true;
    }

  }

}]);