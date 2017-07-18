describe('A search for an article', function() {

  let EC = protractor.ExpectedConditions;
  let searchBar = $('input#searchBar');
  let prmFacetGroup = $('prm-facet-group');
  let yearInputBoxes = $$('prm-facet-group input[ng-model^="$ctrl.facetGroup.additionalData.selected"]');
  let facets = $$('prm-facet-group .section-content .md-chips .md-chip .md-chip-content');
  let filteredFacetsSection = $('div.sidebar-section.filtered-facets-section.animate-chip-section.margin-bottom-large');
  let filteredFacetsSectionRemoveButton = filteredFacetsSection.$('button.md-chip-remove');
  let searchResult = $('.item-title a');
  let altmetricBadge = $('div.altmetric-embed .altmetric-normal-legend');
  let sectionTitles = $$('prm-service-header .section-title');
  let sectionButtons = $$('button[ng-repeat="service in $ctrl.services track by $index"] span');

  beforeEach(function() {
    browser.get(browser.params.targetUrl);
  });

  it('should depict our customizations on the facets and the full view.', function() {

    expect(searchBar.isDisplayed()).toBeTruthy();

    searchBar.sendKeys('fingerprints of global warming on wild animals and plants').sendKeys(protractor.Key.ENTER);

    // Date filters.
    expect(yearInputBoxes.count()).toEqual(2);

    // Facet inclusion icon. (The green tick)
    expect(facets.count()).toBeGreaterThan(1);
    let facet = facets.first();

    let facetIdleWidth, facetHoverWidth;

    let getFacetWidths = () => facet.getCssValue('width')
      .then((value) => {
        facetIdleWidth = parseInt(value);
      })
      .then(() => browser.actions().mouseMove(facet).perform())
      .then(() => facet.getCssValue('width'))
      .then((value) => {
        facetHoverWidth = parseInt(value);
      });

    browser.wait(getFacetWidths(), 5000).then(() => {
      expect(facetHoverWidth).toBeGreaterThan(facetIdleWidth + 15);
    });

    facet.click();

    // The locator we use for the filtered facets section should work.  
    expect(filteredFacetsSection.isDisplayed()).toBeTruthy();

    browser.wait(EC.elementToBeClickable(filteredFacetsSectionRemoveButton), 2000);
    filteredFacetsSectionRemoveButton.click();

    browser.wait(EC.elementToBeClickable(searchResult), 2000);
    searchResult.click();

    browser.wait(EC.visibilityOf(altmetricBadge), 5000);

    expect(sectionTitles.count()).toBeGreaterThan(4);

    sectionTitles.last().getText().then((value) => {
      expect(value.toLowerCase()).toEqual('detaljer');
    }).catch(() => {
      // Should not execute this block.
      expect(true).toBeFalsy();
    })

    expect(sectionButtons.count()).toBeGreaterThan(4);

    sectionButtons.last().getText().then((value) => {
      expect(value.toLowerCase()).toEqual('detaljer');
    }).catch(() => {
      // Should not execute this block.
      expect(true).toBeFalsy();
    })

  })
})