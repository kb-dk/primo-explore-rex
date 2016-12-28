/**
 * Unit test for the announcement service.
 */
describe('announcement,', function() {
  var $rootScope, $mdToast, $translate;

  beforeEach(module('viewCustom'));

  // Mocking $translate service.
  beforeEach(function() {
    module(function($provide) {
      $provide.service('$translate', function() {
        return function() {
          dump('Ra!');
          var translations = {
            'present': 'This is an announcement!',
            'blank': '',
            'label': 'announcement',
            'whitespace': '&nbsp;',
          };
          var translation = 'present';

          return {
            then: function(callback) {
              dump('Hey yo!');
              return callback(translations[translation]);
            },
            translation: translation,
          };

        };
      });
    });
  });

  beforeEach(inject(function(_$mdToast_, _$rootScope_, _$httpBackend_, _$translate_, _announcement_) {
    $mdToast = _$mdToast_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $translate = _$translate_;
    announcement = _announcement_;

    spyOn($mdToast, 'show').and.callThrough();
  }));

  describe('if an announcement is present', function () {

    describe('and if it has not been dismissed,', function() {

      it('should display.', function(done) {

        announcement.display().then(function() {
          expect($mdToast.show).toHaveBeenCalled();
        }).catch(function() {
          // Fail the test if this is called.
          expect(true).toEqual(false);
        }).then(done);

        $httpBackend.expectGET('custom/NUI/html/announcement.html').respond(200);
        $httpBackend.flush();

      });

    });

    describe('and if it has been dismissed,', function() {

      beforeEach(function() {
        $rootScope.announcementDismissed = true;
      });

      it('should not display.', function(done) {
      
        announcement.display().then(function() {
          // Fail the test if this is called.
          expect(true).toEqual(false);
        }).catch(function() {
          expect($mdToast.show).not.toHaveBeenCalled();
        }).then(done);
      
      });

    });

  });

  // describe('if an announcement is not present', function () {
  //   beforeEach(function () {
  //     announcement.$translate.translation = 'label';
  //   });

  //   it('should not display.', function(done) {

  //     announcement.display().then(function() {
  //       // Fail the test if this is called.
  //       expect(true).toEqual(false);
  //     }).catch(function() {
  //       expect($mdToast.show).not.toHaveBeenCalled();
  //     }).then(done);

  //   });
  // });

});