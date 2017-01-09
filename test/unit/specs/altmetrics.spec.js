describe('altmetricsController,', function() {
  var scriptLoader, altmetricsController, $compile, element, _altmetrics, scope;

  beforeEach(module('viewCustom'));

  beforeEach(inject(function(_scriptLoader_, $rootScope, _$compile_) {
    scriptLoader = _scriptLoader_;
    spyOn(scriptLoader, 'load').and.callThrough();
    $compile = _$compile_;
    scope = $rootScope.$new();
  }));

  it('when a DOI is present, should send a request to load the altmetrics badge.', function(done) {
    var doi = '10.1007/BF01386390';

    scope.parentCtrl = {
      parentCtrl: {
        item: {
          pnx: {
            addata: {
              doi: [doi]
            }
          }
        }
      }
    };

    element = angular.element('<rex-altmetrics parent-ctrl="parentCtrl"></rex-altmetrics>');
    $compile(element)(scope);
    altmetricsController = element.controller('rexAltmetrics');

    scope.$digest();
    expect(altmetricsController.doi).toEqual(doi);
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


// describe('altmetricsController,', function() {
//   var scriptLoader, altmetricsController, createController;

//   beforeEach(module('viewCustom'));

//   beforeEach(inject(function(_scriptLoader_, $rootScope, $componentController) {
//     scriptLoader = _scriptLoader_;
//     spyOn(scriptLoader, 'load').and.returnValue(Promise.resolve());

//     scope = $rootScope.$new();
//     altmetricsController = $componentController('rexAltmetrics', scope, {});

//   }));

//   it('when a DOI is present, should send a request to load the altmetrics badge.', function(done) {

//     altmetricsController.doi = '10.1007/BF01386390';

//     altmetricsController.loadBadge().then(function() {
//       expect(scriptLoader.load).toHaveBeenCalledWith('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');
//     }).catch(function(e) {
//       // Should not be executed
//       expect(true).toEqual(false);
//     }).then(done);
//   });

//   it('when a DOI is present, should not send a request to load the altmetrics badge.', function(done) {

//     altmetricsController.doi = undefined;

//     altmetricsController.loadBadge().then(function() {
//       // Should not be executed
//       expect(true).toEqual(false);
//     }).catch(function(e) {
//       expect(scriptLoader.load).not.toHaveBeenCalled();
//     }).then(done);

//   });

// });