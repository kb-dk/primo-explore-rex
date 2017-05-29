import jsonld from 'jsonld';
import { LinkedPerson } from './linkedPerson';

/**
 * Service that retrieves structured data about persons
 * from the Linked Persons Web service and compiles it in
 * according to the current locale.
 *
 * @see https://github.com/Det-Kongelige-Bibliotek/linked_persons 
 */
export class LinkedPersonsService {

  constructor($http, locale) {
    this.$http = $http;
    this.locale = locale;

    // The URL base for the Web service.
    // this.webServiceUrlBase = 'http://0.0.0.0:9292/persons/'
    this.webServiceUrlBase = 'http://ec2-54-229-3-116.eu-west-1.compute.amazonaws.com:9292/persons/'

    this.jsonld = jsonld;
    this.persons = {};
  }

  /**
   * Gets the data for the given URI from the web service,
   * using the cached data if it was retrieved before, and then
   * compiles the data in accoring to the current locale.
   *.
   * @param {String} uri - URI identifying the author whose 
   * data is to be fetched.
   * 
   * @return {Promise<Object>} A promise that resolves with
   * an object containing data for corresponding input URI.
   *
   */
  get(uri) {
    return this.getForRelativeUri(this.relativeUri(uri));
  }

  relativeUri(uri) {
    return '?uri=' + encodeURIComponent(uri);
  }

  getForRelativeUri(uri) {
    return this.getData(uri).then((person) => this.getLocaleData(person));
  }

  getLocaleData(person) {
    let localeId = this.getLocaleId();

    return Promise.resolve(person.getLocaleData(localeId));
  }

  getLocaleId() {
    return this.locale.current() == 'da_DK' ? 'da' : 'en';
  }

  getData(uri) {
    let person = this.persons[uri];

    if (person)
      return Promise.resolve(person);
    else
      return this.getAndSave(uri);
  }

  getAndSave(uri) {
    return this.fetchAndFlatten(uri).then((value) => this.save(uri, value));
  }

  fetchAndFlatten(uri) {
    return this.fetch(uri).then((data) => this.flatten(data));
  }

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

  targetUrl(relative_uri) {
    return this.webServiceUrlBase + relative_uri;
  }

  flatten(data) {
    return new Promise((resolve, reject) => {
      jsonld.flatten(data, (err, flattened) => {
        resolve(flattened);
      });
    });
  }

  save(uri, data) {
    return this.persons[uri] = new LinkedPerson(uri, data);
  }

}

LinkedPersonsService.$inject = ['$http', 'locale'];