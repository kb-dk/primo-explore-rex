describe('nagivationService,', () => {
  let $location, $window, navigationService, dummyPath;

  beforeEach(module('viewCustom'));

  // Mocking $window service.
  beforeEach(() => {

    dummyPath = 'https://rex.kb.dk/primo-explore/a/dummy/path/within/the/app?vid=NUI&lang=da_DK';

    module(($provide) => {
      
      $provide.service('$window', function() {
        return {
          location : {
            href: dummyPath
          },
          open: () => {}
        };

      });
    });
  });

  beforeEach(inject((_$location_, _$window_) => {
    $location = _$location_;
    $window = _$window_;

    spyOn($location, 'search').and.returnValue({
      lang: 'da_DK',
      vid: 'NUI'
    });

    spyOn($location, 'absUrl').and.returnValue(dummyPath);
    
    spyOn($window, 'open');

  }));

  beforeEach(inject((_navigationService_) => {
    nagivationService = _navigationService_;
  }));

  describe('navigateToHomePage method,', () => {

    it('should navigate to the home page.', () => {
      nagivationService.navigateToHomePage();
      // dump($window);
      expect($window.location.href).toEqual('https://rex.kb.dk/primo-explore/search?vid=NUI&lang=da_DK');
    });

  });

  describe('naviagateTo method', () => {

    it('should navigate to the given URL if there is one.', () => {
      nagivationService.navigateTo('https://example.com');
      expect($window.open).toHaveBeenCalledWith('https://example.com', '_blank');
    });

    it('should navigate to the home page if no URL is given.', () => {
      nagivationService.navigateTo();
      expect($window.location.href).toEqual('https://rex.kb.dk/primo-explore/search?vid=NUI&lang=da_DK');
    });

  })

});