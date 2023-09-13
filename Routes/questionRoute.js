const express = require("express");
const router = express.Router();
const questionController = require("../Controller/QuestionController");
const verifyJWT = require("../Middlewares/verifyJWT");

router.use(verifyJWT);

router.route("/anatomy").get(questionController.getAllAnatomyQuestion);
router.route("/physiology").get(questionController.getAllPhysiologyQuestion);
router
  .route("/biochemistry")
  .get(questionController.getAllBiochemistryQuestion);

module.exports = router;
