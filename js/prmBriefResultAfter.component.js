// This is a temporary fix from Exlibris for zotero.
// It would not be needed if primo exposed PNX records in raw XML.
// See: https://forums.zotero.org/discussion/comment/268604/#Comment_268604

import mapValues from 'lodash/mapValues';
import omitBy from 'lodash/omitBy';
import findIndex from 'lodash/findIndex';
import X2JS from 'x2js';

angular.module('viewCustom').component('prmBriefResultAfter', {
  template: '<span ng-if="::$ctrl.zoteroParamsString" class="Z3988" title="{{::$ctrl.zoteroParamsString}}" pnx="{{::$ctrl.pnxInXml}}"></span> ',
  bindings: {
    parentCtrl: '<'
  },
  controller: 'BriefResultAfterController'

});

angular.module('viewCustom').controller('BriefResultAfterController', [function() {
  let vm = this;

  vm.item = vm.parentCtrl.item;

  vm.calcZoteroParams = calcZoteroParams;
  vm.updateZoteroPlugin = updateZoteroPlugin;

  vm.zoteroParamsString = vm.calcZoteroParams();

  vm.pnx = vm.item && vm.item.pnx;

  if (vm.pnx) {
    let top = '<?xml version="1.0" encoding="UTF-8"?><record xmlns="http://www.exlibrisgroup.com/xsd/primo/primo_nm_bib" xmlns:sear="http://www.exlibrisgroup.com/xsd/jaguar/search">';
    let bottom = '</record>';

    let x2js = new X2JS();
    vm.pnxInXml = top + x2js.js2xml(vm.pnx) + bottom;
  }

  vm.updateZoteroPlugin();



  function calcZoteroParams() {
    if (!vm.item.delivery.link) {
      return;
    }
    let openUrlIndex = findIndex(vm.item.delivery.link, (link) => link.displayLabel === 'openurl');
    if (openUrlIndex > -1) {
      let openUrl = vm.item.delivery.link[openUrlIndex]['linkURL'];
      return encodeZoteroValue(openUrl);
    }
  }



  function updateZoteroPlugin() {
    setTimeout(() => {
      let ev = document.createEvent('HTMLEvents');
      ev.initEvent('ZoteroItemUpdated', true, true);
      document.dispatchEvent(ev);
    }, 1000);
  };

  function encodeZoteroValue(value) {
    let params = getQueryParams(value);
    params = omitBy(params, (val) => val === '');
    if (!params['rft.aufirst'] && params['rft.aulast']) { //hack because of a bug in zotero plugin
      params['rft.aufirst'] = params['rft.aulast'];
    }
    params = mapValues(params, (val) => encodeURIComponent(val));
    return serialize(params);
  };

  function escapeCharachters(s) {
    return s.replace(/%/g, '%25').replace(/#/g, '%23').replace(/&/g, '%26')
      .replace(/\+/g, '%2B').replace(/\//g, '%2F').replace(/</g, '%3C').replace(/=/g, '%3D')
      .replace(/>/g, '%3E').replace(/\?/g, '%3F').replace(/:/g, '%3A');
  }

  function getQueryParams(url) {
    let qparams = {},
      parts = (url || '').split('?'),
      qparts, qpart,
      i = 0;

    if (parts.length <= 1) {
      return qparams;
    } else {
      qparts = parts[1].split('&');
      for (i in qparts) {

        qpart = qparts[i].split('=');
        qparams[decodeURIComponent(qpart[0])] =
          decodeURIComponent(qpart[1] || '');
      }
    }

    return qparams;
  };

  function serialize(obj) {
    let str = [];
    for (let p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(p + "=" + obj[p]);
      }
    return str.join("&");
  }

}]);