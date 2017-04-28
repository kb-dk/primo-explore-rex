import { viewName } from './viewName';

class NewsFeedController {
  constructor(feedParser) {
    this.feedParser = feedParser;
  }

  $onInit() {
    this.feedParser.parse('http://kub.kb.dk/rss/blog.php?g=579871')
    .then((feed) => {
      this.feed = feed;
    });
  }

};

NewsFeedController.$inject = ['feedParser'];

export let NewsFeedConfig = {
  name: 'rexNewsFeed',
  config: {
    controller: NewsFeedController,
    templateUrl: 'custom/' + viewName + '/html/newsFeed.html',
  }
};