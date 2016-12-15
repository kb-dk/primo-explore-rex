describe('App initialization', function() {
    var $rootScope;

    beforeEach(module('viewCustom'));
    
    beforeEach(inject(function(_$rootScope_) {
        $rootScope = _$rootScope_;
    }));
   
    it('sets the global view name.', function() {
        expect($rootScope.globalViewName).toBeDefined();
        expect($rootScope.globalViewName).toEqual(globalViewName);
    });

});