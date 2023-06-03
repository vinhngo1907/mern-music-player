const co = require("co");
const axios = require("axios");

module.exports = async function getSong(req, res, next) {
    const { name, id } = req.query;
    console.log(name, id);
    // TO DO: use async await when targeting node 8.0 
    // co(function* () {
    //     const html = yield request()
    // })
    try {
        const response = await axios.get(`https://mp3.zing.vn/bai-hat/${name}/${id}.html`);
        console.log(response.data)
    } catch (error) {
        console.log(error);
        next(error);
    }
}