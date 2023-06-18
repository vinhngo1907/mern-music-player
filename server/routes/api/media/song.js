const co = require("co");
const { request } = require("utils");

module.exports = async function getSong(req, res, next) {
    const { name, id } = req.query;
    // TO DO: use async await when targeting node 8.0 
    co(function* () {
        const html = yield request(`https://mp3.zing.vn/bai-hat/${name}/${id}.html`);
        const regex = /key=.{33}/;
        const match = html.match(regex);
        if (!match) {
            throw new Error("")
        }

        const [matchUrl] = match;
        return { url: "https://mp3.zing.vn/xhr/media/get-source?type=audio&" + matchUrl };
    }).then(data => {
        request(data.url).then(response => {
            response = JSON.parse(response);
            res.json(response.data);
        })
    }).catch(error => next(error));
}