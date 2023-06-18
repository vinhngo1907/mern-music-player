const { request } = require("utils");
const ZingMP3 = require('../../../lib/ZingMP3');
const axios = require("axios");

module.exports = async function (req, res, next) {
    const { term } = req.query;
    const url = ZingMP3.composeURL(ZingMP3.V2.resources.search, { q: term });
    try {
        const response = await axios.get(url);
        res.send(response.data)
    } catch (error) {
        console.log(error);
        next(error);
    }
}