const mongoose = require("mongoose");

const biochemSchema = new mongoose.Schema({
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

const Biochemistry = mongoose.model("Biochemistry", biochemSchema);

module.exports = Biochemistry;
