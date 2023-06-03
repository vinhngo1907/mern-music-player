const { request, pageQuery } = require("utils");
const Scraper = require("lib/PageScraper");
const { V_API } = require("consts");

module.exports = function (req, res, next) {
    const { genre, id, page } = req.query;

    request(`http://mp3.zing.vn/the-loai-nghe-si/${genre}/${id}.html?${pageQuery(page)}`)
        .then(html => {
            const parser = new Scraper(html);
            parser
                .list('.pone-of-five .item')
                .setKey('artist')
                .extractAttr('src', 'img', 'thumb')
                .extractAttr('text', 'a.txt-primary', 'name')
                .extractAttr('href', 'a', 'link')
                .paginate();

            res.json(parser.get());
        }).catch(error => next(error))
}