class PrmRequestsOverviewAfterController {
  
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
    return element.querySelectorAll('p[ng-if="::request.secondLineRight"] span');
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
