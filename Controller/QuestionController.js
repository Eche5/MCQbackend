const Question = require("../Model/questionModel");
const Physiology = require("../Model/physiologyModel");
const Biochemistry = require("../Model/bioChemistryModel");
exports.getAllAnatomyQuestion = async (req, res) => {
  try {
    const question = await Question.find();
    res.status(200).json({
      status: "success",
      result: question.length,
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "something went wrong⛔",
    });
  }
};

exports.getAllPhysiologyQuestion = async (req, res) => {
  try {
    const question = await Physiology.find();
    res.status(200).json({
      result: question.length,
      status: "success",
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "something went wrong⛔",
    });
  }
};

exports.getAllBiochemistryQuestion = async (req, res) => {
  try {
    const question = await Biochemistry.find();
    res.status(200).json({
      result: question.length,
      status: "success",
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "something went wrong⛔",
    });
  }
};
