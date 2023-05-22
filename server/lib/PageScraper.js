const BaseScraper = require('./BaseScraper');
const util = require('util');

/**
 * @description model
 *  {
      "songs": [
        {
          "title": "What do you mean?",
          "id": "69797",
          "artist": "Justin Bieber"
        },
        {
          "title": "We don't talk any more",
          "id": "69797",
          "artist": "Charlie Purth
        },
      ]
    }
*/

function PageScraper(...args) {
    BaseScraper.apply(this, args);
    this.key = ''; // key can be a noun for a list of result such as <songs, videos, albums>
    this.attrs = {}; // attributes that will be extracted from the element
    this.elements = [] // dom array
}

util.inherits(PageScraper, BaseScraper);

// static methods
PageScraper.pluralize = function (string) {
    return `${string}`;
}

/**
 * @description get the list of element from the $(selector)
 * @param <string> selector 
 * @returns 
 */

PageScraper.prototype.list = function (selector) {
    // test the validation of the passed selector see if it has the prefix '.' or '#'
    this.testSelector(selector);
    this.elements = this.$(selector);
    return this;
}

/**
 * @description pluralize the output key
 * @param <string> key
 * Ex: this.setKey('song');
 * { 'songs': [] }
*/
PageScraper.prototype.setKey = function (key) {
    if (/s$/.test(key)) {
        this.key = key;
    } else {
        this.key = PageScraper.pluralize(key);
    }
    return this;
};

module.exports = PageScraper;