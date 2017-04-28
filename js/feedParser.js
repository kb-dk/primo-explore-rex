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

    return new Promise((resolve, reject) => {
      
      if (this.feed) {
        resolve(this.feed);
        return;
      }

      this.$http.get(feedUrl).then((response) => {
        let parser = new xml2js.Parser();        

        parser.parseString(response.data, (err, result) => {
          if (err) {
            reject(err);
            return;
          } 
            
          this.feed = result.feed.entry.map(entry => {
            return {
              title: entry.title && entry.title[0],
              link: entry.link && entry.link[0].$.href,
              time: entry.updated && entry.updated[0],
              summary: entry.summary && entry.summary[0]._
            };
          });

          resolve(this.feed);
        
        });
      
      });

    });

  }

}

FeedParserService.$inject = ['$http'];