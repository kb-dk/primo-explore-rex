import xml2js from 'xml2js';

/**
 * A service for parsing the LibGuides news feed for REX, 
 * which is in Atom (XML).
 *
 * @see http://kub.kb.dk/c.php?g=579871&p=4527001
 * @see http://kub.kb.dk/rss/blog.php?g=579871
 */
export class FeedParserService {

  constructor($http) {
    this.$http = $http;
  }

  /**
   * Method to parse the news feed specified with the 
   * given URL.
   *
   * @param {String} feedUrl - URL for the feed to be parsed.
   * @return {Promise<Array>} A Promise that resolves with an object,
   * containing the feed data. 
   */
  parse(feedUrl) {

    this.parser = new xml2js.Parser();

    return new Promise((resolve, reject) => {

      this.$http.get(feedUrl).then((response) => {
        this.parser.parseString(response.data, (err, result) => {
          if (err) {
            reject(err);
          }
          else {
            resolve(result.feed);
          }
        });
      });

    });

  }

}

FeedParserService.$inject = ['$http'];