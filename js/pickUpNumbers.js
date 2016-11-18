// Service inserting the pick up numbers for the requested items.
// TODO: Need to be optimized! The current way we utilize this service yields two requests per record.
angular.module('viewCustom').factory('pickUpNumbers', ['$http', '$location', function($http, $location) {

  return {

    insertPickUpNumbers: function(targetContainer, requests, selector) {

      var targetElements = selector(targetContainer);

      requests.forEach(function(requestItem) {
        var requestId = requestItem.requestId;
        var regex = requestId + "$"

        // The DOM element containing the request ID of the item.
        var matchedElement = Array.prototype.find.call(targetElements, (target) => {
          return target.textContent.match(new RegExp(regex))
        });

        if (!matchedElement) return false;

        // The requested item can only have a pick up number if it has a hold deadline.
        if (requestItem.expandedDisplay.find((field) => field.label === "request.holds.end_hold_date")) {

          var serviceURL;
          if ($location.host() == "localhost")
            serviceURL = "http://rex-test.kb.dk/cgi-bin/";
          // servicePath = 'http://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=';
          else
            serviceURL = $location.absUrl().split("/primo-explore/")[0] + "/cgi-bin/";


          var titleMatch = requestId.match(/^TITLE([0-9]*)/)

          if (titleMatch && titleMatch.length == 2) {
            serviceURL += "get_pickup_number_title_kgl?z370_rec_key=" + titleMatch[1];
          } else {
            serviceURL += "get_pickup_number_text?z37_rec_key=" + requestId.slice(-19);
          }

          // Retrieving the pick up numbers from the associated service. 
          // Request URL may look like the following.
          // https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0078814230000100001
          // 'http://rex-test.kb.dk/cgi-bin/get_pickup_number_title_kgl?z370_rec_key=000000371
          $http.get(serviceURL)
            .then(successCallback, errorCallback);

        } else {
          matchedElement.textContent = matchedElement.textContent.replace("-" + requestId, "");
        }
        // The callback function for a successful retrieval. 
        function successCallback(response) {
          var pickUpNumber = response.data.split(/<body>|<\/body>/)[1];
          matchedElement.textContent = matchedElement.textContent.replace("-" + requestId, pickUpNumber);
        };

        // The callback function for a failed retrieval.
        function errorCallback(response) {
          // TODO: Do these work?
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