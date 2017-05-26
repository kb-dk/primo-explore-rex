import jsonld from 'jsonld';

/**
 * Service retrieving structured data on the authors
 * from the Linked Persons Web service, which is refered as
 * the source service in the remainder of the documentation.
 *
 * @see https://github.com/Det-Kongelige-Bibliotek/linked_persons 
 */
export class LinkedPersonsService {

  constructor($http) {
    this.$http = $http;

    // The URL base for the source service.
    // this.sourceServiceUrlBase = 'http://0.0.0.0:9292/persons/?uri='
    this.sourceServiceUrlBase = 'http://ec2-54-229-3-116.eu-west-1.compute.amazonaws.com:9292/persons/?uri='
    
    this.jsonld = jsonld;
    this.persons = {};
  }

  /**
   * Gets the data for the given URI from the source service,
   * uses the cached data if it was retrieved before.
   *.
   * @param {String} uri - URI identifying the author whose 
   * data is to be fetched.
   * 
   * @return {Promise<Object>} A promise that resolves with
   * an object containing data for corresponding input URI.
   *
   */
  get(uri) {
    if (this.persons[uri])
      return Promise.resolve(this.persons[uri]);
    else
      return this.getAndSave(uri);
  }

  getAndSave(uri) {
    return this.fetchAndFlatten(uri).then((value) => this.save(uri, value));
  }

  fetchAndFlatten(uri) {
    return this.fetch(uri).then((data) => this.flatten(data));
  };

  fetch(uri) {

    let request = {
      method: 'GET',
      url: this.targetUrl(uri),
      headers: {
        'Accept': 'application/ld+json'
      },
    }

    return this.$http(request).then((response) => response.data);
  }

  targetUrl(uri) {
    return this.sourceServiceUrlBase + encodeURIComponent(uri);
  }

  flatten(data) {
    return new Promise((resolve, reject) => {
      jsonld.flatten(data, (err, flattened) => {
        resolve(flattened);
      });
    }); 
  }

  save(uri, value) {
    return this.persons[uri] = value;
  }

}

LinkedPersonsService.$inject = ['$http'];