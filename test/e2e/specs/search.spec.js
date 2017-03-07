describe('Search', function() {

  let EC = protractor.ExpectedConditions;
  let searchBar = $('input#searchBar');
  let prmFacetGroup = $('prm-facet-group');
  let yearInputBoxes = $$('prm-facet-group input[ng-model^="$ctrl.facetGroup.additionalData.selected"]');
  let facets = $$('prm-facet-group .section-content .md-chips .md-chip .md-chip-content');
  let filteredFacetsSection = $('div.sidebar-section.filtered-facets-section.animate-chip-section.margin-bottom-large');
  let filteredFacetsSectionRemoveButton = filteredFacetsSection.$('button.md-chip-remove');
  let searchResult = $('.item-title a');
  let altmetricBadge = $('div.altmetric-embed .altmetric-normal-legend');
  let sectionTitles = $$('h2.section-title');
  let sectionButtons = $$('button[ng-repeat="service in $ctrl.services track by $index"]');

  beforeEach(function() {
    browser.get('https://rex-test.kb.dk');
  });

  fit('should depict the customizations we performed.', function() {

    expect(searchBar.isDisplayed()).toBeTruthy();

    searchBar.sendKeys('Fingerprints of global warming on wild animals and plants').sendKeys(protractor.Key.ENTER);

    // Date filters.
    expect(yearInputBoxes.count()).toEqual(2);

    // Facet inclusion icon. (The green tick)
    expect(facets.count() > 1).toBeTruthy();
    let facet = facets.first();
    let facetIdleWidth = parseInt(facet.getCssValue('width'));
    browser.actions().mouseMove(facet).perform();
    let facetHoverWidth = parseInt(facet.getCssValue('width'));    
    // The icon sho`=uld make the element wider.
    expect(facetHoverWidth > facetIdleWidth + 15).toBeTruthy();


    facet.click();

    // The locator we use for the filtered facets section should work.  
    expect(filteredFacetsSection.isDisplayed()).toBeTruthy();

    browser.wait(EC.elementToBeClickable(filteredFacetsSectionRemoveButton), 2000);
    filteredFacetsSectionRemoveButton.click();

    browser.wait(EC.elementToBeClickable(searchResult), 2000);
    searchResult.click();

    browser.wait(EC.visibilityOf(altmetricBadge), 5000);

    expect(sectionTitles.count() > 4).toBeTruthy();
    expect(sectionTitles.last().getAttribute('translate')).toEqual("brief.results.tabs.details");

    expect(sectionButtons.count() > 4).toBeTruthy();
    expect(sectionButtons.last().getAttribute('translate')).toEqual("brief.results.tabs.details");

    // TODO: sectionButtons.last().getAttribute('translate') returns a boolean. Find out why.

  })
})

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