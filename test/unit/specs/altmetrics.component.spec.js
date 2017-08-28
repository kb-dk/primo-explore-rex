describe('altmetricsController,', function() {
  let scriptLoaderService, $componentController, mock, doi;

  beforeEach(module('viewCustom'));

  beforeEach(inject(function(_scriptLoaderService_, _$httpBackend_) {
    scriptLoaderService = _scriptLoaderService_;
    spyOn(scriptLoaderService, 'load').and.returnValue(Promise.resolve());

    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', 'https://api.altmetric.com/v1/doi/10.1007/BF01386390')
      .respond('', {});

    doi = '10.1007/BF01386390';

    mock = {
      successCallback: () => Promise.resolve()
    }

    spyOn(mock, 'successCallback').and.callThrough();

  }));

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('when a DOI is present, should load the Altmetrics badge', (done) => {
    let altmetricsController = $componentController('rexAltmetrics', null, {
      onLoad: mock.successCallback,
      doi: doi,
    });

    altmetricsController.$onInit().then(() => {
      expect(altmetricsController.doi).toEqual(doi);
      expect(scriptLoaderService.load).toHaveBeenCalledWith('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');
      expect(mock.successCallback).toHaveBeenCalled();
      done();
    });

    $httpBackend.expectGET('https://api.altmetric.com/v1/doi/10.1007/BF01386390').respond(200);
    $httpBackend.flush();    

  });

  it('when a DOI is not present, should not load the Altmetrics badge', (done) => {
    let altmetricsController = $componentController('rexAltmetrics', null, {
      onLoad: mock.successCallback,
    });

    altmetricsController.$onInit().then(() => {
      expect(altmetricsController.doi).not.toBeDefined();
      expect(scriptLoaderService.load).not.toHaveBeenCalled();
      expect(mock.successCallback).not.toHaveBeenCalled();
      done();
    });
  });


});