const express = require("express");
const router = express.Router();
const questionController = require("../Controller/QuestionController");

router.route("/").get(questionController.getAllAnatomyQuestion);
router.route("/physiology").get(questionController.getAllPhysiologyQuestion);
router
  .route("/biochemistry")
  .get(questionController.getAllBiochemistryQuestion);

module.exports = router;
