const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    otp: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

otpSchema.pre("save", async function (next) {

  if (!this.isModified("otp")) return next();

  const saltRounds = 10;
  this.otp = await bcrypt.hash(this.otp, saltRounds);

  next();
});

module.exports = mongoose.model("OTP", otpSchema);
