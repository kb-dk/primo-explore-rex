describe('Opening hours widget', function() {

  beforeEach(function() {
    browser.get('https://rex-test.kb.dk');
  
    // ptor = protractor.getInstance();
    // ptor.ignoreSynchronization = true;
    // ptor.waitForAngular();
    // ptor.get('https://rex-test.kb.dk');

  });

  it('should be displayed, should show library info, and should be destroyed properly.)', function() {

    let EC = protractor.ExpectedConditions;
    let openingHoursView = $('.openingHoursView[style="display: block;"]');
    let openingHoursScript = $('script[src="https://static.kb.dk/libcal/openingHours_min.js"]');
    let openingHoursStylesheet = $('link[href="https://static.kb.dk/libcal/openingHoursStyles_min.css"]');
    let libraryNameLink = openingHoursView.element(by.xpath('.//a[.="Den Sorte Diamant"]'));
    let infoLink = openingHoursView.element(by.xpath('.//a[.="Info"]'));
    
    let openingHoursModalDiv = $('div#openingHoursModalDiv');
    let openingHoursModalInfoBox = openingHoursModalDiv.$('div#openingHoursModalInfobox');
    let openingHoursModalDismissButton = openingHoursModalDiv.$('button.close');

    openingHoursView.element(by.xpath('.//a[.="Info"]'));

    expect(openingHoursView.isDisplayed()).toBeTruthy();
    expect(openingHoursScript.isPresent()).toBeTruthy();
    expect(openingHoursStylesheet.isPresent()).toBeTruthy();

    browser.wait(EC.elementToBeClickable(libraryNameLink), 3000);

    element(by.id('favorites-button')).click();

    // Opening hours wigdet should be destroyed.  
    expect(openingHoursView.isPresent()).toBeFalsy();
    expect(openingHoursScript.isPresent()).toBeFalsy();
    expect(openingHoursStylesheet.isPresent()).toBeFalsy();

    element(by.id('search-button')).click();

    // The widget should be loaded back.    
    expect(openingHoursView.isDisplayed()).toBeTruthy();
    expect(openingHoursScript.isPresent()).toBeTruthy();
    expect(openingHoursStylesheet.isPresent()).toBeTruthy();

    browser.wait(EC.elementToBeClickable(libraryNameLink), 3000);

    libraryNameLink.click();

    browser.wait(EC.not(EC.elementToBeClickable(libraryNameLink)), 3000);
    browser.wait(EC.elementToBeClickable(infoLink), 3000);
    
    infoLink.click();

    expect(openingHoursModalInfoBox.isDisplayed()).toBeTruthy();
    browser.wait(EC.elementToBeClickable(openingHoursModalDismissButton), 3000);

    openingHoursModalDismissButton.click();

    browser.wait(EC.invisibilityOf(openingHoursModalInfoBox), 3000);
  });

});