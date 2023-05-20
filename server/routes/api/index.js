const express = require("express");
const router = express.Router();
const user = require("./user");
const media = require("./media");

router.use('/user', user);
router.use('/song', media);

module.exports = router;