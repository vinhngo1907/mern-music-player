const express = require("express");
const router = express.Router();
const getSong = require("./song");

router.get("/song", getSong);

module.exports = router;