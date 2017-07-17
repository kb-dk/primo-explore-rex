export class LocaleService {
  constructor($location) {
    this.$location = $location;
  }

  current() {
    return this.$location.search().lang;
  }
}

LocaleService.$inject = ['$location'];