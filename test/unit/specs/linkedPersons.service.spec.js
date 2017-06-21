describe('linkedPersonsService,', () => {

  let $httpBackend, locale, linkedPersonsService, uri, responseBody;

  beforeEach(module('viewCustom'));

  beforeEach(inject((_locale_) => {
    locale = _locale_;
    locale.current = () => 'da_DK';
  }));

  beforeEach(inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;

    uri = "http://viaf.org/viaf/36915259";
    requestUrl = 'https://ec2-54-229-3-116.eu-west-1.compute.amazonaws.com/persons/?uri=http%3A%2F%2Fviaf.org%2Fviaf%2F36915259';
    responseBody = `
      {
        "@context": {
          "schema": "http://schema.org/"
        },
        "@graph": [
          {
            "@id": "?uri=http%3A%2F%2Fviaf.org%2Fviaf%2F36915259",
            "@type": [
              "schema:Person",
              "http://wikiba.se/ontology-beta#Item"
            ],
            "schema:name": [
              {
                "@value": "English Name",
                "@language": "en"
              },
              {
                "@value": "Danish Name",
                "@language": "da"
              }
            ]
          }
        ]
      }
    `;

    $httpBackend.whenGET(requestUrl).respond(responseBody, {'Content-Type': 'application/ld+json'});
  }));

  beforeEach(inject((_linkedPersonsService_) => {
    linkedPersonsService = _linkedPersonsService_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should retrieve and transform data for a single URI.', (done) => {
    linkedPersonsService.get(uri).then((person) => {
        expect(person).toBeTruthy();        
        expect(person.name[0]).toEqual('Danish Name');        
        done();
      })
      .catch(done.fail);

    $httpBackend.flush();
  });

});