const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "please provide your password"],
  },

  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function(pass) {
        return this.password === pass;
      },
      message: "passwords do not match",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.comparePassword = async function(
  currentPassword,
  userPassword
) {
  return await bcrypt.compare(currentPassword, userPassword);
};
userSchema.virtual("results", {
  ref: "Result",
  foreignField: "user",
  localField: "_id",
});
const User = mongoose.model("User", userSchema);

module.exports = User;
