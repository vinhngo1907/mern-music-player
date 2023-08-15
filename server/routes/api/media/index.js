const express = require("express");
const router = express.Router();
const getSong = require("./song");
const getTop100 = require("./top100");
const getArtists = require("./artists");
const getArtist = require("./artist");
const getChart = require("./chart");
const getSuggestedSongs = require("./suggested_songs");
const search = require("./search");
const albums = require("./albums");

router.get("/song", getSong);
router.get('/top100/:type', getTop100);
router.get('/artists', getArtists);
router.get('/artist/:name/:type', getArtist);
router.get('/chart/:id', getChart);
router.get('/suggested-song', getSuggestedSongs);
router.get('/search', search);
router.get('/albums', albums);

module.exports = router;