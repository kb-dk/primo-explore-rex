// conf.js
exports.config = {
  framework: 'jasmine',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['specs/**.js'],
  multiCapabilities: [
  // {
  //   browserName: 'firefox',
  // }, 
  {
    browserName: 'chrome',
  }],
  onPrepare: () => {
    let width = 1600;
    let height = 900;

    browser.driver.manage().window().setSize(width, height);

  },
  params: {
    // targetUrl: 'https://rex.kb.dk',
    targetUrl: 'http://localhost:8003/primo-explore/search?vid=NUI&lang=da_DK',
  }
}

