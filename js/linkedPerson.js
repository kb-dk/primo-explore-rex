let targetProperties = {
  name: 'http://schema.org/name',
  description: 'http://schema.org/description',
  altLabel: 'http://www.w3.org/2004/02/skos/core#altLabel',
  sameAs: 'http://schema.org/sameAs',
  pseudonym: 'http://www.wikidata.org/prop/direct/P742',
  image: 'http://www.wikidata.org/prop/direct/P18',
  usedLanguage: 'http://www.wikidata.org/prop/direct/P1412',
  placeOfBirth: 'http://www.wikidata.org/prop/direct/P19',
  placeOfDeath: 'http://www.wikidata.org/prop/direct/P20',
  gender: 'http://www.wikidata.org/prop/direct/P21',
  countryOfcitizenship: 'http://www.wikidata.org/prop/direct/P27',
  nativeLanguage: 'http://www.wikidata.org/prop/direct/P103',
  occupation: 'http://www.wikidata.org/prop/direct/P106',
  dateOfBirth: 'http://www.wikidata.org/prop/direct/P569',
  dateOfDeath: 'http://www.wikidata.org/prop/direct/P570',
}


/**
 * Model representing a person whose data is fetched 
 * from the Linked Persons Web service.
 *  
 * @see https://github.com/Det-Kongelige-Bibliotek/linked_persons
 */
export class LinkedPerson {
  /**
   * @param {String} uri - A URI identifying the person.
   * @param {Array} data - An array of flattened JSON-LD objects.
   */
  constructor(uri, data) {
    this.uri = uri;
    this.data = data;

    this.targetProperties = targetProperties;

    this.mainResource = this.findInData(this.uri);
  }

  findInData(uri) {
    return this.data.find((object) => object['@id'] == uri);
  }

  /**
   * Transforms the person data to make it locale specific 
   * and easier to consume.
   *
   * @param {String} localeId - 'da' or 'en'. Defaults to 'en'.
   * 
   * @return {Object} An object containing the transformed data.
   *
   */
  getLocaleData(localeId = 'en') {

    let localeData = {}
    let propertyNames = this.namesOfExistingProperties();
    propertyNames.forEach((propertyName) => {
      localeData[propertyName] = this.getPropertyInLocale(propertyName, localeId);
    });
    
    localeData = this.convertDates(localeData);
    return this.cleanData(localeData);
  }

  namesOfExistingProperties() {
    return Object.keys(this.targetProperties).filter((propertyName) => {
      let propertyUri = this.targetProperties[propertyName];
      return this.mainResource[propertyUri];
    });
  }

  convertDates(data) {
    let datePropertyNames = ['dateOfBirth', 'dateOfDeath'];
    let dateProperties = datePropertyNames.filter((propertyName) => data[propertyName]);
    
    dateProperties.forEach((property) => {
      let propertyValue = property[0];
      if(propertyValue)
        data[property][0] = new Date(propertyValue).getFullYear(); 
    });

    return data;
  }

  cleanData(data) {
    Object.keys(data).forEach((property) => {
      let filtered = data[property].filter(Boolean);

      if (filtered.length == 0)
        delete data[property];
      else
        data[property] = filtered;
    });

    return data;
  }

  getPropertyInLocale(propertyName, localeId) {
    let propertyUri = this.targetProperties[propertyName];

    return this.transformValues(propertyUri, localeId);
  }

  transformValues(propertyUri, localeId) {
    return this.mainResource[propertyUri].map((value) =>
      this.transformValue(value, localeId)
    );
  }

  transformValue(value, localeId) {
    if (value['@id']) {
      return this.transformUriValue(value['@id'], localeId);
    } else {
      return this.transformLiteralValue(value, localeId);
    }
  }

  transformLiteralValue(value, localeId) {
    return this.shouldLiteralValueStay(value, localeId) ? value['@value'] : null
  }

  shouldLiteralValueStay(value, localeId) {
    return (value['@type'] || (value['@language'] == localeId));
  }

  transformUriValue(uri, localeId) {
    let resource = this.findInData(uri);
    let nameInLocale;

    if (resource) {
      nameInLocale = this.getNameInLocale(resource, localeId);
    }

    return nameInLocale || uri;
  }

  getNameInLocale(resource, localeId) {
    let found = resource['http://schema.org/name'].find((nameValue) =>
      this.shouldLiteralValueStay(nameValue, localeId)
    );

    return found ? found['@value'] : false;
  }

}