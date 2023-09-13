const express = require("express");
const resultController = require("../Controller/resultController");
const router = express.Router();
// const verifyJWT = require("../Middlewares/verifyJWT");

// router.use(verifyJWT);

router
  .route("/results")
  .post(resultController.createResult)
  .get(resultController.getResults);
module.exports = router;
