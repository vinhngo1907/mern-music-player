const express = require("express");
const router = express.Router();
const getSong = require("./song");
const getTop100 = require("./top100");
const getArtists = require("./artists");
const getArtist = require("./artist");

router.get("/song", getSong);
router.get('/top100/:type', getTop100);
router.get('/artists', getArtists);
router.get('/artist/:name/:type', getArtist);

module.exports = router;