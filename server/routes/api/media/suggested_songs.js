const { default: axios } = require("axios");
const { request } = require("utils");

module.exports = async function getSuggestedSongs(req, res, next) {
    const { songId, artistId } = req.query;
    const url = `https://mp3.zing.vn/xhr/recommend?target=%23block-recommend&count=20&start=0&artistid=${artistId}&type=audio&id=${songId}`;
    // request(url)
    //     .then(body => {
    //         console.log({ body });
    //         const data = JSON.parse(body);
    //         res.json(data);
    //     }).catch(err => next(err));
    try {
        const response = await axios.get(url);
        res.json(response.data);
        return true
    } catch (error) {
        next(error);
    }
}