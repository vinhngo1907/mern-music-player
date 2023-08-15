const { request, pageQuery } = require('utils');
const Scraper = require('lib/PageScraper');
const cheerio = require("cheerio");
const rp = require("request-promise");

module.exports = function getDefaultArtists(req, res, next) {
    require("http://mp3.zing.vn/the-loai-nghe-si")
        .then(html => {
            const parser = new Scraper(html);
        })
        .catch(err => next(err));
}