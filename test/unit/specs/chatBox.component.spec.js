describe('chatBoxController,', () => {
  let localeService, scriptLoaderService, $componentController;

  beforeEach(module('viewCustom'));

  beforeEach(inject((_scriptLoaderService_) => {

    scriptLoaderService = _scriptLoaderService_;
    spyOn(scriptLoaderService, 'load').and.returnValue(Promise.resolve());
    spyOn(scriptLoaderService, 'unload').and.returnValue(true);

  }));

  beforeEach(inject((_$componentController_) => {
    $componentController = _$componentController_;
  }));

  describe('$onInit method,', () => {

    it('should load the chat box in English when the locale is "en_US".', (done) => {
      let localeService = {
        current: () => 'en_US',
      };

      let chatBoxController = $componentController('rexChatBox', {
        localeService: localeService,
      });

      let scriptUrlForEnglish = 'https://region-eu.libanswers.com/load_chat.php?hash=2065a8d15fb45f3c911c2b223cc81286';

      chatBoxController.$onInit().then(() => {
        expect(chatBoxController.scriptUrl).toEqual(scriptUrlForEnglish);
        expect(scriptLoaderService.load).toHaveBeenCalledWith(scriptUrlForEnglish);
        done();
      }).catch(done.fail);
    });

    it('should load the chat box in Danish when the locale is "da_DK".', (done) => {
      let localeService = {
        current: () => 'da_DK',
      };

      let chatBoxController = $componentController('rexChatBox', {
        localeService: localeService,
      });

      let scriptUrlForDanish = 'https://region-eu.libanswers.com/load_chat.php?hash=7df867c6243394f970f8550332c4b607';

      chatBoxController.$onInit().then(() => {
        expect(chatBoxController.scriptUrl).toEqual(scriptUrlForDanish);
        expect(scriptLoaderService.load).toHaveBeenCalledWith(scriptUrlForDanish);
        done();
      }).catch(done.fail);
    });

  });

  it('$onDestroy method should unload the chat box script.', () => {
    let localeService = {
      current: () => 'da_DK',
    };

    let chatBoxController = $componentController('rexChatBox', {
      localeService: localeService,
    });

    let dummyScriptUrl = 'https://dummy.url';
    chatBoxController.scriptUrl = dummyScriptUrl;

    chatBoxController.$onDestroy();
    expect(scriptLoaderService.unload).toHaveBeenCalledWith(dummyScriptUrl, 'js');

  });

});