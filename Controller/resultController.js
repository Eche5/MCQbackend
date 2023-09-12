const Result = require("../Model/resultModel");

exports.createResult = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getResults = async (req, res) => {
  try {
    const results = await Result.find().populate("user");
    res.status(201).json({
      status: "success",
      results,
    });
  } catch (error) {
    res.status(404).json({
      status: "failed",
      message: error.message,
    });
  }
};
exports.getOneResult = async (req, res) => {
  const userId = req.params.id;
  const course = req.params.course;
  try {
    const userResults = await Result.find({ user: userId, course });
    console.log(userResults);
    res.status(200).json({
      status: "success",
      userResults,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
