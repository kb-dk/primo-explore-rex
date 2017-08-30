import {
  viewName
} from './viewName';

class ChatBoxController {
  constructor($scope, scriptLoaderService, localeService) {
    this.$scope = $scope;
    this.scriptLoaderService = scriptLoaderService;
    this.localeService = localeService;
  }

  $onInit() {
    this.constructChatBoxScriptUrl();
    return this.loadChatBoxScript()
      .then(() => {
        console.log('Chat box loaded!');
      })
      .catch(() => {
        throw new Error('Chat box could not be loaded!');
      });
  }

  constructChatBoxScriptUrl() {
    let scriptUrlBase = 'https://region-eu.libanswers.com/load_chat.php?hash=';
    let scriptIds = {
      'en_US': '2065a8d15fb45f3c911c2b223cc81286',
      'da_DK': '7df867c6243394f970f8550332c4b607'
    };
    this.scriptId = scriptIds[this.localeService.current()];
    this.scriptUrl = scriptUrlBase + this.scriptId;
  }

  loadChatBoxScript() {
    return this.scriptLoaderService.load(this.scriptUrl);
  }

  $onDestroy() {
    this.scriptLoaderService.unload(this.scriptUrl, 'js');
    console.log('Chat box destroyed!');
  }

}

ChatBoxController.$inject = ['$scope', 'scriptLoaderService', 'localeService'];

export let ChatBoxConfig = {
  name: 'rexChatBox',
  config: {
    controller: ChatBoxController,
    templateUrl: 'custom/' + viewName + '/html/chatBox.component.html',
  }
}