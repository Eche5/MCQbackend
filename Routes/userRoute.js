const express = require("express");
const AuthController = require("../Controller/AuthController");
const router = express.Router();

router.route("/Register").post(AuthController.Register);
router.route("/Login").post(AuthController.Login);

module.exports = router;
