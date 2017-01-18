describe('pickUpNumbers,', function() {
  let $httpBackend, $location, pickUpNumbers, selector, targetContainer, requests;

  beforeEach(module('viewCustom'));

  beforeEach(inject(function(_$httpBackend_, _$location_) {
    $httpBackend = _$httpBackend_;
    
    $location = _$location_;
    spyOn($location, 'absUrl').and.returnValue('https://rex.kb.dk/primo-explore/account?vid=NUI&section=requests&lang=da_DK');
    

    $httpBackend.when('GET', 'https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=0092310720000100008')
      .respond('<html><head></head><body>- Nr. 11-12</body></html>', {});

    $httpBackend.when('GET', 'https://rex.kb.dk/cgi-bin/get_pickup_number_text?z37_rec_key=3412341234123412341')
      .respond('<html><head></head><body></body></html>', {});

    $httpBackend.when('GET', 'https://rex.kb.dk/cgi-bin/get_pickup_number_title_kgl?z370_rec_key=123456')
      .respond('<html><head></head><body>- Nr. 56-57</body></html>', {});

  }));

  beforeEach(inject(function(_pickUpNumbers_) {
    pickUpNumbers = _pickUpNumbers_;
  }));

  beforeEach(function() {
    requests = [{
      requestId: 'KGL500092310720000100008',
      expandedDisplay: [{
        label: "request.holds.end_hold_date"
      }]
    }, {
      requestId: 'KGL123412341234123412341',
      expandedDisplay: [{
        label: "request.holds.end_hold_date"
      }]
    }, {
      requestId: 'TITLE123456',
      expandedDisplay: [{
        label: "request.holds.end_hold_date"
      }]
    }, ];

    let targetContainerText = '<ul><li>Mock -KGL500092310720000100008</li><li>Mock -KGL123412341234123412341</li><li>Mock -TITLE123456</li></ul>'
    targetContainer = angular.element(targetContainerText)[0];
    selector = (element) => element.getElementsByTagName('li');
  });

   afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should retrieve and insert the pick-up numbers.', function(done) {
    // debugger;
    let expectedInnerElement = '<li>Mock - Nr. 11-12</li><li>Mock </li><li>Mock - Nr. 56-57</li>';

    pickUpNumbers.insertPickUpNumbers(targetContainer, requests, selector).then(() => {
      expect(targetContainer.innerHTML).toEqual(expectedInnerElement);
    }).catch(() => {
      // Should not execute this block.
      expect(true).toEqual(false);
    }).then(done);

    $httpBackend.flush();
  });



})