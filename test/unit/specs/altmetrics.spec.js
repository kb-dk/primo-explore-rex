describe('altmetricsController,', function() {
  var scriptLoader, altmetricsController, $compile, element, _altmetrics, scope;

  beforeEach(module('viewCustom'));

  beforeEach(inject(function(_scriptLoader_, $rootScope, _$compile_) {
    scriptLoader = _scriptLoader_;
    spyOn(scriptLoader, 'load').and.returnValue(Promise.resolve());
    $compile = _$compile_;
    scope = $rootScope.$new();
    scope.doi = '10.1007/BF01386390';
  }));

  it('when a DOI is present, should send a request to load the altmetrics badge.', function(done) {
    element = angular.element('<rex-altmetrics doi="doi"></rex-altmetrics>');
    $compile(element)(scope);
    altmetricsController = element.controller('rexAltmetrics');

    scope.$digest();
    expect(altmetricsController.doi).toEqual(scope.doi);
    expect(scriptLoader.load).toHaveBeenCalledWith('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');

    done();
  });

  it('when a DOI is present, should not send a request to load the altmetrics badge.', function(done) {
    element = angular.element('<rex-altmetrics></rex-altmetrics>');
    $compile(element)(scope);
    altmetricsController = element.controller('rexAltmetrics');

    scope.$digest();
    expect(altmetricsController.doi).toBeUndefined();
    expect(scriptLoader.load).not.toHaveBeenCalled();

    done();
  });

});