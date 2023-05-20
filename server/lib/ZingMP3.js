const Crypto = require("./Crypto");
const querystring = require("querystring");
const { ZING_MP3_VERSION, ZING_MP3_SECRET, ZING_MP3_API_KEY } = process.env;

const V2 = {
    host: "https://zingmp3.vn",

    resources: {
        album: "/api/v2/song/get/list",
        defaultAlbums: "/api/v2/page/get/hub-home",
        chart: "/api/v2/page/get/week-chart",
        search: "/api/v2/search/multi",
        getStream: "/api/v2/song/get/streaming",
        getDetail: "/api/v2/page/get/playlist",
    },
};
