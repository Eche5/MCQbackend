const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      enum: ["anatomy", "physiology", "biochemistry"],
      required: [true, "a coourse name is required"],
    },
    score: {
      type: Number,
      required: [true, "a coourse score is required"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "please attach your name to the result"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
