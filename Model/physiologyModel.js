const mongoose = require("mongoose");

const physiologySchema = new mongoose.Schema({
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

const Physiology = mongoose.model("Physiology", physiologySchema);

module.exports = Physiology;
