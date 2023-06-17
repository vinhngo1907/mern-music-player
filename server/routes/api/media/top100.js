// const redisClient = require('lib/Redis');
const { request } = require("utils");
const rp = require("request-promise");
const ZingMp3 = require("../../../lib/ZingMP3");
const { V_API } = require("consts");
const axios = require("axios");

module.exports = function getTop100(req, res, next) {
    const [popId, kpopId, vpopId] = ["ZWZB96AB", "ZWZB96DC", "ZWZB969E"];
    let id;

    switch (req.params.type) {
        case popId:
            id = popId;
            break;
        case kpopId:
            id = kpopId;
            break;
        case vpopId:
            id = vpopId;
            break;
        default:
    }

    const pageNum = Number(req.query.page);
    console.log({ pageNum });
    const start = pageNum ? (pageNum - 1) * 20 : 0;
    const url = ZingMp3.composeURL(ZingMp3.V2.resources.getDetail, { id })

    // Get all 100 data from Zingmp3 Detail Id
    request(url)
        .then(response => {
            response = JSON.parse(response);
            //only fetch 20 items
            response.data.song.items = response.data.song.items.splice(start, 20);
            res.send({ items: response.data.song.items });
        })
        .catch(err => {
            console.log(err);
            next(err)
        });
}