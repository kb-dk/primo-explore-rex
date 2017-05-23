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
    this.sourceServiceUrlBase = 'http://0.0.0.0:9292/persons/?uri='
    this.persons = {};
  }


  /**
   * Fetches the given array of URIs.
   * @param {Array<String>} uris - An array of URIs identifying 
   * authors whose data is to be fetched.
   * 
   * @return {Array<Object>} An array of objects elements of which
   * are the retrieved data for corresponding input URIs.
   *
   */
  get(uris) {
    return uris.map(this.getSingle);
  }

  getSingle(uri) {
    return this.persons[uri] || getAndSave(uri);
  }

  getAndSave(uri) {
    return this.persons[uri] = fetchAndParse(uri);
  }

  fetchAndParse(uri) {
    return fetch(uri).then(parse);
  }

  fetch(uri) {
    return this.$http.get(this.targetUrl(uri));
  }

  targetUrl(uri) {
    console.log(this)
    return this.sourceServiceUrlBase + encodeURIComponent(uri);
  }

  parse(response) {
    return new Promise((resolve,reject) => {
      console.log(response);
      resolve(response);  
    });
  }

}

LinkedPersonsService.$inject = ['$http'];