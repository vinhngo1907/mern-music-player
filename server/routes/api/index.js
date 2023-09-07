const express = require("express");
const router = express.Router();
const user = require("./user");
const media = require("./media");
const playlist = require('./playlist');
const requireAuth = require('middlewares/require_authentication');

router.use('/user', user);
router.use('/media', media);
router.use('/playlist', requireAuth, playlist);

module.exports = router;