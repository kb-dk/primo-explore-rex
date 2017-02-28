describe('scriptLoader service,', () => {
  let angularLoadMonkeyPatched, scriptLoader;

  beforeEach(module('viewCustom'));

  beforeEach(inject((_angularLoadMonkeyPatched_) => {
    angularLoadMonkeyPatched = _angularLoadMonkeyPatched_;

    spyOn(angularLoadMonkeyPatched, 'loadScript').and.returnValue(Promise.resolve());

  }))

  beforeEach(inject((_scriptLoader_) => {
    scriptLoader = _scriptLoader_;
  }))

  it('load method should call angularLoadMonkeyPatched with the provided parameter.', (done) => {
    scriptLoader.load('http://example.com')
      .then(() => {
        expect(angularLoadMonkeyPatched.loadScript).toHaveBeenCalledWith('http://example.com');
      })
      .catch(() => {
        // This function should not be executed. 
        expect(true).toEqual(false);
      })
      .then(done);
  });

  describe('unload method,', () => {

    describe('should remove form the DOM a JS file', () => {

      beforeEach(() => {
        let script = document.createElement('script');
        script.src = 'http://example.com/dummy.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      });

      it('identified with a partial name.', () => {
        expect(document.querySelector('script[src="http://example.com/dummy.js"]')).toBeTruthy();
        scriptLoader.unload('dummy', 'js');
        expect(document.querySelector('script[src="http://example.com/dummy.js"]')).toBeFalsy();
      });

      it('identified with an absolute URL.', () => {
        expect(document.querySelector('script[src="http://example.com/dummy.js"]')).toBeTruthy();
        scriptLoader.unload('http://example.com/dummy.js', 'js');
        expect(document.querySelector('script[src="http://example.com/dummy.js"]')).toBeFalsy();
      });

    });

    describe('should remove form the DOM a CSS file', () => {

      beforeEach(() => {
        let link = document.createElement('link');
        link.href = 'http://example.com/dummy.css';
        document.getElementsByTagName('head')[0].appendChild(link);
      });

      it('identified with a partial name.', () => {
        expect(document.querySelector('link[href="http://example.com/dummy.css"]')).toBeTruthy();
        scriptLoader.unload('dummy', 'css');
        expect(document.querySelector('link[href="http://example.com/dummy.css"]')).toBeFalsy();
      });

      it('identified with an absolute URL.', () => {
                
        expect(document.querySelector('link[href="http://example.com/dummy.css"]')).toBeTruthy();
        scriptLoader.unload('http://example.com/dummy.css', 'css');
        expect(document.querySelector('link[href="http://example.com/dummy.css"]')).toBeFalsy();
      });

    });


  })

});