describe('altmetricsController,', function() {
  var $httpBackend, altmetricsController;

  beforeEach(module('viewCustom'));

  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(inject(function($contorller) {
    altmetricsController = $controller('altmetricsController');
  }));

  describe('when a DOI is not present,', function() {
    beforeEach(inject(function() {
      altmetricsController.doi = '10.1038/nature.2012.9872';
    }));

    it('should load not the altmetrics badge.', function(done) {
      altmetricsController.loadBadge().then(function() {
        // Should not be executed.
        expect(true).toEqual(false);        
      }).catch(function() {}).then(done);
    });

  });


  describe('when a DOI is present,', function() {
    beforeEach(inject(function() {
      altmetricsController.doi = '10.1038/nature.2012.9872';
    }));

    it('should load the altmetrics badge.', function(done) {
      altmetricsController.loadBadge().catch(function() {
        // Should not be executed.
        expect(true).toEqual(false);        
      }).then(done);

      $httpBackend.expectGet('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js').respond(200);
      // Another expectGet is needed here for the retrieval of the metrics.
      $httpBackend.flush();
    });

  });

});