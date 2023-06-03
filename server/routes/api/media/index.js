const express = require("express");
const router = express.Router();
const getSong = require("./song");
const getTop100 = require("./top100");

router.get("/song", getSong);
router.get('/top100/:type', getTop100);

module.exports = router;