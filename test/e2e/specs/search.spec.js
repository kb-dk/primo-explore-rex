// describe('Home page', function() {

//   beforeEach(function() {
//     browser.get('https://rex-test.kb.dk');
//   });

//   it('should display the opening hours widget', function() {
//     expect(element(by.css('.openingHoursView')).isDisplayed()).toBe(true);

//     element(by.id('favorites-button')).click();
//     element(by.id('search-button')).click();

//     expect(element(by.css('.openingHoursView')).isDisplayed()).toBe(true);

//   });

//   it('should display the announcement', function() {
//     let EC = protractor.ExpectedConditions;
//     let languageButton = element(by.model('$ctrl.selectedLanguage'));
//     let englishOption = $('md-option[value="en_US"]');
//     let announcement = $('md-toast.rex-announcement');

//     browser.actions().mouseMove($('prm-user-area')).perform();
//     browser.wait(EC.elementToBeClickable(languageButton), 2000);
//     languageButton.click();


//     EC.elementToBeClickable(englishOption)().catch(() => {
//       expect(true).toBe(false);
//     });

//     // browser.wait(EC.elementToBeClickable(englishOption), 500);
//     englishOption.click();
    
//     expect(announcement.isDisplayed()).toBe(true);

//   });


// });


// // describe('Search', function() {
// //   var firstNumber = element(by.model('first'));
// //   var secondNumber = element(by.model('second'));
// //   var goButton = element(by.id('gobutton'));
// //   var latestResult = element(by.binding('latest'));
// //   var history = element.all(by.repeater('result in memory'));

// //   function add(a, b) {
// //     firstNumber.sendKeys(a);
// //     secondNumber.sendKeys(b);
// //     goButton.click();
// //   }

// //   beforeEach(function() {
// //     browser.get('http://juliemr.github.io/protractor-demo/');
// //   });

// //   it('should have a history', function() {
// //     add(1, 2);
// //     add(3, 4);

// //     expect(history.count()).toEqual(2);

// //     add(5, 6);

// //     expect(history.count()).toEqual(3); // This is wrong!
// //   });

// //   it('should have a history', function() {
// //     add(1, 2);
// //     add(3, 4);

// //     expect(history.last().getText()).toContain('1 + 2');
// //     expect(history.first().getText()).toContain('3 + 4'); // This is wrong!
// //   });
// // });