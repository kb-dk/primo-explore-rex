/** 
 * Service to insert the pick up numbers for the requested items.
 */
export class PickUpNumbersService {
  constructor($http, $location) {
    this.$http = $http;
    this.$location = $location;

    this._serviceBaseUrl = (this.$location.host() === "localhost") ?
      "https://rex.kb.dk/cgi-bin/" :
      this.$location.absUrl().split("/primo-explore/")[0] + "/cgi-bin/";

    this._pickUpNumbersForIds = {};
    this._ongoingInsertions = 0;
    this._runningPromise;
  }

  /**
    * Binds a watcher to the given controller.
    * The watcher watches for the elements
    * containing the request IDs, and when the 
    * elements become available, inserts the pickup 
    * numbers if they exist.  
    */
  waitForIdsAndInsertPickUpNumbers(ctrl) {
    ctrl.$scope.$watch(() => ctrl.selector(ctrl.parentElement).length, 
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          this.insertPickUpNumbers(ctrl.parentElement, ctrl.parentCtrl.requestsService.requestsDisplay, ctrl.selector);
        }
      }
    );
  }

  /** 
   *  Method to retrieve and insert the pick-up numbers
   *  into the given DOM element.
   *  If the method is called when a previous run
   *  has not finished, it chains the new insertion
   *  into the promise of the previous call.
   *  @param {Object} targetContainer - A DOM element 
   *    containing the elements the pick-up
   *    numbers are to be inserted.
   *  @param {Array} requests - An array of request items, 
   *    pick-up numbers of which are to be retrieved.
   *  @param {function} selector - A selector function to return 
   *    the target DOM elements when called with a
   *    ancestor DOM element.
   *  @return {Promise} A Promise to be resolved 
   *    when the pick-up numbers are inserted. 
   */
  insertPickUpNumbers(targetContainer, requests, selector) {
    if (this._runningPromise) {
      // If there is an ongoing insertion, 
      // perform the new insertion when the former is done. 
      return this._runningPromise.then(() => {
        return this._insert(targetContainer, requests, selector);
      });
    } else {
      // Else, perform the insertion.
      return this._insert(targetContainer, requests, selector);
    }
  }

  _insert(targetContainer, requests, selector) {
    let ctrl = this;

    ctrl._runningPromise = new Promise((resolve, reject) => {

      let targetElements = selector(targetContainer);
      let requestObjects = ctrl._composeRequestObjects(targetElements, requests);

      ctrl._ongoingInsertions = requestObjects.length;

      requestObjects.forEach((request) => {

        ctrl._insertForRequest(request).then(() => {
          ctrl._ongoingInsertions = ctrl._ongoingInsertions - 1;
          if (ctrl._ongoingInsertions === 0) {
            resolve();
            return;
          }
        });
      });

    });

    // TODO: This looks weird, but seems to work OK.
    this._runningPromise.then(() => {
      this._runningPromise = null;
    });

    return this._runningPromise;

  }

  // Returns an array of objects with request related data.
  _composeRequestObjects(targetElements, requests) {
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
  _insertForRequest(request) {
    let ctrl = this;

    return new Promise((resolve, reject) => {
      // If there is no DOM element to be altered,
      // do nothing.
      if (!request.element) {
        resolve();
        return;
      }

      if (ctrl._pickUpNumbersForIds[request.id]) {
        // If the pick-up number for the request is already known, use it.  
        ctrl._replaceIdText(request, ctrl._pickUpNumbersForIds[request.id]);
        resolve();
      } else if (request.expandedDisplay.find((field) => field.label === "request.holds.end_hold_date")) {
        // Else, if it has a hold deadline, retrieve and insert the pick-up number.
        // The requested item can only have a pick up number if it has a hold deadline.
        ctrl._retrievePickUpNumber(request.id).then((response) => {
          // Insert the pick-up number text.
          let pickUpNumber = response.data.split(/<body>|<\/body>/)[1];
          ctrl._pickUpNumbersForIds[request.id] = pickUpNumber;
          ctrl._replaceIdText(request, pickUpNumber);
          resolve();
        }).catch(() => {
          ctrl._removeIdText(request);
          console.log('REX: Could not retrieve the pick up number.');
          resolve();
        });

      } else {
        // Else, remove the request ID from the view.
        ctrl._removeIdText(request);
        resolve();
      }

    });

  }

  // Removes the request ID.
  _removeIdText(request) {
    this._replaceIdText(request, "");
  };

  // Retrieves the pick up numbers from the associated service. 
  // Request URL may look like the following.
  // https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0078814230000100001
  // 'https://rex-test.kb.dk/cgi-bin/get_pickup_number_title_kgl?z370_rec_key=000000371
  _retrievePickUpNumber(requestId) {
    let serviceURL = this._serviceBaseUrl;
    let titleMatch = requestId.match(/^TITLE([0-9]*)/);

    if (titleMatch && titleMatch.length === 2) {
      serviceURL += "get_pickup_number_title_kgl?z370_rec_key=" + titleMatch[1];
    } else {
      serviceURL += "get_pickup_number_text?z37_rec_key=" + requestId.slice(-19);
    }

    return this.$http.get(serviceURL);
  };

  // Replaces the request ID text with the given string.
  _replaceIdText(request, text) {
    request.element.textContent = request.element.textContent.replace("-" + request.id, text);
  };

}

PickUpNumbersService.$inject = ['$http', '$location'];