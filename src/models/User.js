import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNo: { type: Number, required: true },
  otp: { type: String, required: true },
  password: { type: String, required: true },
  accessToken: { type: String, require: true },
  refreshToken: { type: String, require: true },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
});

// Define a method to generate OTP
UserSchema.methods.generateOTP = function () {
  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 6-digit OTP
  this.otp = otp;
  return otp;
};

UserSchema.methods.generateAccessToken = () => {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      mobileNo: this.mobileNo,
    },
    qwertyuiop,
    {
      expiresIn: 360000,
    }
  );
};

UserSchema.methods.generateRefreshToken = () => {
  return jwt.sign(
    {
      _id: this._id,
    },
    qwertyuiop,
    {
      expiresIn: 360000,
    }
  );
};

// Create and export the User model
const User = mongoose.model("User", UserSchema);
export default User;
