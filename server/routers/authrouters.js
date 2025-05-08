const express = require("express");
const { home } = require("../controllers/authcontroller");
const router = express.Router();

router.route("/").get(home)

module.exports = router;
