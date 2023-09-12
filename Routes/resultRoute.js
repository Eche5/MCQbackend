const express = require("express");
const resultController = require("../Controller/resultController");
const router = express.Router();

router
  .route("/")
  .post(resultController.createResult)
  .get(resultController.getResults);
module.exports = router;
