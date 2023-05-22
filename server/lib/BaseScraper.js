/**
 *@description a library that can scrape anything from http://mp3.zing.vn
 *@author vinhngo1907 https://github.com/vinhngo1907
*/

const cheerio = require('cheerio');

function BaseScraper(...args) {
    const [html, opt] = args;
    this.$ = opt ? cheerio.load(html, opt) : cheerio.load(html);
    this.result = {};
    this.$root = this.$('body');
}

BaseScraper.prototype.setRoot = function(rootSelector){
    this.$root = this.$(rootSelector);
    return this;
}

module.exports = BaseScraper;