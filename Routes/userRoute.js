const express = require("express");
const AuthController = require("../Controller/AuthController");
const resultController = require("../Controller/resultController");
const loginLimiter = require("../Middlewares/LoginLimiter");
const router = express.Router();

router.route("/Register").post(AuthController.Register);
router.route("/auth").post(loginLimiter, AuthController.Login);
router.route("/logout").post(AuthController.LogOut);
router.route("/:id/:course").get(resultController.getOneResult);
module.exports = router;
