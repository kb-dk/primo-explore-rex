// describe('navigation service,', () => {
//   let $location, $window, navigation;

//   beforeEach(module('viewCustom'));

//   beforeEach(inject((_$location_) => {
//     $location = _$location_;


//     spyOn($location, 'search').and.returnValue({
//       lang: 'da_DK',
//       vid: 'NUI'
//     });

//     spyOn($location, 'absUrl').and.returnValue('https://rex.kb.dk/primo-explore/search?vid=NUI&lang=da_DK');

//     $window = {
//       location: {
//         href: 'https://rex.kb.dk/primo-explore/search?vid=NUI&lang=da_DK'
//       },
//       open: () => {}
//     }

//     dump($window.location.href);
//   }));

//   beforeEach(inject((_navigation_) => {
//     navigation = _navigation_;
//   }));

//   describe('navigateToHomePage method,', () => {

//     it('should navigate to the home page.', () => {
//       navigation.navigateToHomePage();
//       expect($window.location.href).toEqual('https://rex.kb.dk/primo-explore/search?vid=NUI&lang=da_DK');
//       dump($window.location.href);
//     });

//   });

// });