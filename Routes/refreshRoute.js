const express = require("express");
const AuthController = require("../Controller/AuthController");
const router = express.Router();

router.route("/refresh").get(AuthController.refresh);

module.exports = router;
