/** 
  * Service to insert the pick up numbers for the requested items.
  */

// TODO: Need to be optimized! The current way we utilize this service yields two requests per record.
angular.module('viewCustom').service('pickUpNumbers', [
  '$http',
  '$location',
  function($http, $location) {

    let serviceBaseUrl = ($location.host() === "localhost") ?
      "https://rex.kb.dk/cgi-bin/" :
      $location.absUrl().split("/primo-explore/")[0] + "/cgi-bin/";
    let pickUpNumbersForIds = {};

    // Retrieving the pick up numbers from the associated service. 
    // Request URL may look like the following.
    // https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0078814230000100001
    // 'https://rex-test.kb.dk/cgi-bin/get_pickup_number_title_kgl?z370_rec_key=000000371
    function retrieve(requestId) {

      let serviceURL = serviceBaseUrl;
      let titleMatch = requestId.match(/^TITLE([0-9]*)/);

      if (titleMatch && titleMatch.length === 2) {
        serviceURL += "get_pickup_number_title_kgl?z370_rec_key=" + titleMatch[1];
      } else {
        serviceURL += "get_pickup_number_text?z37_rec_key=" + requestId.slice(-19);
      }

      return $http.get(serviceURL);
    };


    /** 
     *  Retrieves and inserts the pick-up numbers.
     *  @param {Object} targetContainer - An html element 
     *    containing the elements the pick-up
     *    numbers are to be inserted.
     *  @param {Array} requests - An array of request items, 
     *    pick-up numbers of which are to be retrieved.
     *  @param {function} selector - A selector function to return 
     *    the target html elements when called with the
     *    targetContainer.
     */
    this.insertPickUpNumbers = (targetContainer, requests, selector) => {

      var targetElements = selector(targetContainer);

      requests.forEach(function(requestItem) {
        var requestId = requestItem.requestId;
        var regex = requestId + "$"

        // The DOM element containing the request ID of the item.
        var matchedElement = Array.prototype.find.call(targetElements, (target) => {
          return target.textContent.match(new RegExp(regex))
        });

        // If the request ID cannot be found, skip the check for the request.
        if (!matchedElement) return;

        if (pickUpNumbersForIds[requestId]) {
        // If the pick-up number for the request is already known, use it.  
          replaceIdText(pickUpNumbersForIds[requestId]);
        } else if (requestItem.expandedDisplay.find((field) => field.label === "request.holds.end_hold_date")) {
          // Else, if it has a hold deadline, retrieve and insert the pick-up number.
          // The requested item can only have a pick up number if it has a hold deadline.
          retrieve(requestId).then(insertPickUpNumber).catch(logError).catch(removeId);
        } else {
          // Else, remove the request ID from the view.
          removeId();
        }

        // Insert the pick-up number.
        function insertPickUpNumber(response) {
          let pickUpNumber = response.data.split(/<body>|<\/body>/)[1];
          pickUpNumbersForIds[requestId] = pickUpNumber;
          replaceIdText(pickUpNumber);
        };

        // Log the request error.
        function logError(response) {
          console.log('REX: Could not retrieve the pick up number.');
          return Promise.reject();
        };

        // Replaces the request ID text with the given string.
        function replaceIdText(pickUpNumber) {
          matchedElement.textContent = matchedElement.textContent.replace("-" + requestId, pickUpNumber);
        };

        // Removes the request ID.
        function removeId() {
          replaceIdText("");
        };

      });

    };

  }
]);