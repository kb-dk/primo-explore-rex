class PrmRequestsOverviewAfterController {
  
  constructor($scope, $element, pickUpNumbersService) {
    this.$scope = $scope;
    this.$element = $element;
    this.pickUpNumbersService = pickUpNumbersService;
  }

  $onInit() {
    this.parentElement = this.$element.parent()[0];
    this.pickUpNumbersService.waitForIdsAndInsertPickUpNumbers(this);    
  }

  selector(element) {
    return element.querySelectorAll('p[ng-if="::request.secondLineRight"] span');
  }

}

PrmRequestsOverviewAfterController.$inject = ['$scope', '$element', 'pickUpNumbersService'];

export let PrmRequestsOverviewAfterConfig = {
  name: 'prmRequestsOverviewAfter',
  config: {
    bindings: {
      parentCtrl: '<'
    },
    controller: PrmRequestsOverviewAfterController,
  }
}
