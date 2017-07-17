/**
 * A service to load and unload JS scripts.
 */
export class ScriptLoaderService {
  constructor(angularLoadMonkeyPatched) {
    this.angularLoadMonkeyPatched = angularLoadMonkeyPatched;
  }

  /**
   * Loads the JS script with given URL.
   * @param {string} url - The URL of the script to be loaded.
   */
  load(url) { 
    return this.angularLoadMonkeyPatched.loadScript(url);
  }

  /**
   * Removes the JS or CSS file with the given file name from the DOM. 
   * See: http://stackoverflow.com/questions/9425910/load-and-unload-javascript-at-runtime/9425964#9425964
   * @param {string} fileName- The name of the file to be removed.
   * @param {string} fileType- The type of the file to be removed.
   */
  unload(fileName, fileType) {
    // Determine element type to create nodelist from
    var targetElement = (fileType == "js") ? "script" : (fileType == "css") ? "link" : "none"
      // Determine corresponding attribute to test for
    var targetAttr = (fileType == "js") ? "src" : (fileType == "css") ? "href" : "none"
    var allSuspects = document.getElementsByTagName(targetElement)
      // Search backwards within nodelist for matching elements to remove
    for (var i = allSuspects.length; i >= 0; i--) {
      if (allSuspects[i] && allSuspects[i].getAttribute(targetAttr) != null && allSuspects[i].getAttribute(targetAttr).indexOf(fileName) != -1)
      // Remove element by calling parentNode.removeChild()
        allSuspects[i].parentNode.removeChild(allSuspects[i])
    }
  }

}

ScriptLoaderService.$inject = ['angularLoadMonkeyPatched'];