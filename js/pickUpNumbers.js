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

    // Retrieves the pick up numbers from the associated service. 
    // Request URL may look like the following.
    // https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0078814230000100001
    // 'https://rex-test.kb.dk/cgi-bin/get_pickup_number_title_kgl?z370_rec_key=000000371
    function retrievePickUpNumber(requestId) {

      let serviceURL = serviceBaseUrl;
      let titleMatch = requestId.match(/^TITLE([0-9]*)/);

      if (titleMatch && titleMatch.length === 2) {
        serviceURL += "get_pickup_number_title_kgl?z370_rec_key=" + titleMatch[1];
      } else {
        serviceURL += "get_pickup_number_text?z37_rec_key=" + requestId.slice(-19);
      }

      return $http.get(serviceURL);
    };

    // Returns an array of objects with request related data.
    function composeRequestObjects(targetElements, requests) {
      return requests.map((request) => {
        let regex = request.requestId + "$";
        return {
          element: Array.prototype.find.call(targetElements, (target) => {
            return target.textContent.match(new RegExp(regex))
          }),
          id: request.requestId,
          expandedDisplay: request.expandedDisplay
        }
      });
    };

    // Inserts the pickup number for given request.
    function insertForRequest(request) {
      if (!request.element) return;

      if (pickUpNumbersForIds[request.id]) {
        // If the pick-up number for the request is already known, use it.  
        replaceIdText(request, pickUpNumbersForIds[request.id]);
      } else if (request.expandedDisplay.find((field) => field.label === "request.holds.end_hold_date")) {
        // Else, if it has a hold deadline, retrieve and insert the pick-up number.
        // The requested item can only have a pick up number if it has a hold deadline.
        retrievePickUpNumber(request.id).then((response) => {
          // Insert the pick-up number text.
          let pickUpNumber = response.data.split(/<body>|<\/body>/)[1];
          pickUpNumbersForIds[request.id] = pickUpNumber;
          replaceIdText(request, pickUpNumber);
        }).catch(() => {
          removeIdText(request);
          console.log('REX: Could not retrieve the pick up number.');
        });

      } else {
        // Else, remove the request ID from the view.
        removeIdText(request);
      }
    }

    // Replaces the request ID text with the given string.
    function replaceIdText(request, text) {
      request.element.textContent = request.element.textContent.replace("-" + request.id, text);
    };

    // Removes the request ID.
    function removeIdText(request) {
      replaceIdText(request, "");
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
      let targetElements = selector(targetContainer);
      let requestObjects = composeRequestObjects(targetElements, requests);
      requestObjects.forEach((request) => {
        insertForRequest(request);
      });
    }

  }
]);