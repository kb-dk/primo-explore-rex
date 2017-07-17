/**
 * Unit test for the announcement service.
 */
describe('announcement,', function() {
  var $mdToast, $translate;

  beforeEach(module('viewCustom'));

  // Mocking $translate service.
  beforeEach(function() {
    module(function($provide) {
      $provide.service('$translate', function() {
      
        var translation = 'This is an announcement!';

        return function() {
          return {
            translation: () => translation,
            then: function(callback) {
              return callback(this.translation());
            },
            setTranslation: function(newTranslation) {
              translation = newTranslation;
            },
          };
        };

      });
    });
  });

  beforeEach(inject(function(_$mdToast_, _$httpBackend_, _$translate_, _announcement_) {
    $mdToast = _$mdToast_;
    $httpBackend = _$httpBackend_;
    $translate = _$translate_;
    announcement = _announcement_;

    spyOn($mdToast, 'show').and.callThrough();
  }));

  describe('if an announcement is present', function() {

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

    // This can no longer be tested.
    // TODO: An integration test to replace this.
    // describe('and if it has been dismissed,', function() {

    //   beforeEach(function() {
    //     $rootScope.announcementDismissed = true;
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

  describe('if an announcement is not present', function() {

    beforeEach(function() {
      $translate().setTranslation('announcement');
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