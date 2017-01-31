class PrmRequestsOverviewAfterController {
  
  constructor($scope, $element, pickUpNumbers) {
    this.$scope = $scope;
    this.$element = $element;
    this.pickUpNumbers = pickUpNumbers;
    
    this.parentElement = this.$element.parent()[0];
    
    this.$scope.$watch(() => this.parentElement.querySelector('p[ng-if="::request.secondLineRight"]'), 
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          this.pickUpNumbers.insertPickUpNumbers(this.parentElement, this.parentCtrl.requestsService.requestsDisplay, this.selector);
        }
      }
    );

  }

  selector(element) {
    return element.getElementsByTagName('span');
  }

}

PrmRequestsOverviewAfterController.$inject = ['$scope', '$element', 'pickUpNumbers'];

export let PrmRequestsOverviewAfterConfig = {
  name: 'prmRequestsOverviewAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmRequestsOverviewAfterController,
  }
}
