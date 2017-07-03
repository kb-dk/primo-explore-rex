class PrmRequestsAfterController {

  constructor($scope, $element, pickUpNumbers) {
    this.$scope = $scope;
    this.$element = $element;
    this.pickUpNumbers = pickUpNumbers;
  }

  $onInit() {
    this.parentElement = this.$element.parent()[0];
    this.pickUpNumbers.waitForIdsAndInsertPickUpNumbers(this);     
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
