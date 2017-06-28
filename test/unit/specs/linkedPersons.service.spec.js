describe('linkedPersonsService,', () => {

  let $httpBackend, locale, linkedPersonsService, uris, responseBodies, requestUrls;

  beforeEach(module('viewCustom'));

  beforeEach(inject((_locale_) => {
    locale = _locale_;
    locale.current = () => 'da_DK';
  }));

  beforeEach(inject((_$httpBackend_) => {
    $httpBackend = _$httpBackend_;

    uris = ['http://viaf.org/viaf/36915259', 'http://www.wikidata.org/entity/Q1607626'];
    requestUrls = [
      'https://ec2-54-229-3-116.eu-west-1.compute.amazonaws.com/persons/?uri=http%3A%2F%2Fviaf.org%2Fviaf%2F36915259',
      'https://ec2-54-229-3-116.eu-west-1.compute.amazonaws.com/persons/?uri=http%3A%2F%2Fwww.wikidata.org%2Fentity%2FQ1607626',
    ];
    responseBodies = [
    `
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
    `,
    `
      {
        "@context": {
          "schema": "http://schema.org/"
        },
        "@graph": [
          {
            "@id": "?uri=http%3A%2F%2Fwww.wikidata.org%2Fentity%2FQ1607626",
            "@type": [
              "schema:Person",
              "http://wikiba.se/ontology-beta#Item"
            ],
            "schema:name": [
              {
                "@value": "Another English Name",
                "@language": "en"
              },
              {
                "@value": "Another Danish Name",
                "@language": "da"
              }
            ]
          }
        ]
      }
    `];


    $httpBackend.whenGET(requestUrls[0]).respond(responseBodies[0], {'Content-Type': 'application/ld+json'});
    $httpBackend.whenGET(requestUrls[1]).respond(responseBodies[1], {'Content-Type': 'application/ld+json'});
  
  }));

  beforeEach(inject((_linkedPersonsService_) => {
    linkedPersonsService = _linkedPersonsService_;
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should retrieve and transform data for a single URI.', (done) => {
    linkedPersonsService.get(uris[0]).then((person) => {
        expect(person).toBeTruthy();        
        expect(person.name[0]).toEqual('Danish Name');        
        done();
      })
      .catch(done.fail);

    $httpBackend.flush();
  });

  it('should retrieve and transform data for a multiple URIs.', (done) => {
    linkedPersonsService.getMultiple(uris).then((persons) => {
        expect(persons).toBeTruthy();        
        expect(persons[0].name[0]).toEqual('Danish Name');        
        expect(persons[1].name[0]).toEqual('Another Danish Name');        
        done();
      })
      .catch(done.fail);

    $httpBackend.flush();
  });

  it('should be able to retrieve and transform data in English.', (done) => {
    locale.current = () => 'en_US';
    linkedPersonsService.getMultiple(uris).then((persons) => {
        expect(persons).toBeTruthy();        
        expect(persons[0].name[0]).toEqual('English Name');        
        expect(persons[1].name[0]).toEqual('Another English Name');        
        done();
      })
      .catch(done.fail);

    $httpBackend.flush();
  });



});