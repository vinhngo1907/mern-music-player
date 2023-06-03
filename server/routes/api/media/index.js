const express = require("express");
const router = express.Router();
const getSong = require("./song");
const getTop100 = require("./top100");
const getArtists = require("./artists");

router.get("/song", getSong);
router.get('/top100/:type', getTop100);
router.get('/artists', getArtists);

module.exports = router;