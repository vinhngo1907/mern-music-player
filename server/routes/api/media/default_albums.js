const { request } = require("utils");
const ZingMP3 = require("../../../lib/ZingMP3");

module.exports = function getAlbums(req, res, next) {
    const url = ZingMP3.composeURL(ZingMP3.V2.resources.album, {});
    
    request(url).then(response => {
        response = JSON.parse(response);
        res.send(response.data);
    }).catch(err => next(err));
}