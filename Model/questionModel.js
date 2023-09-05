const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
  },

  options: {
    type: Array,
  },

  correctOption: {
    type: Number,
  },

  points: {
    type: Number,
  },
});

const Questions = mongoose.model("Questions", questionSchema);

module.exports = Questions;
