class PrmRequestsAfterController {

  constructor($scope, $element, pickUpNumbers) {
    this.$scope = $scope;
    this.$element = $element;
    this.pickUpNumbers = pickUpNumbers;

    this.parentElement = this.$element.parent()[0];
    this.$scope.$watch(() => this.parentElement.querySelector('p[ng-if="::requestDisplay.secondLineRight"]'),
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          this.pickUpNumbers.insertPickUpNumbers(this.parentElement, this.parentCtrl.requestsService.requestsDisplay, this.selector);
        }
      }
    );

  }

  selector(element) {
    return element.querySelectorAll('p[ng-if="::requestDisplay.secondLineRight"]');
  }

}

PrmRequestsAfterController.$inject = ['$scope', '$element', 'pickUpNumbers'];

export let PrmRequestsAfterConfig = {
  name: 'prmRequestsAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmRequestsAfterController,
  }
}
