import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';

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
  isVerified: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
});

// Define a method to generate OTP
UserSchema.statics.generateOTP = async function () {
  const otp = await Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 6-digit OTP
  this.otp = otp;
  return otp;
};

// Generate Access Token
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

// Generate Refresh Token
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

// Static method to hash password
UserSchema.statics.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Check email is already exist or not
UserSchema.statics.isEmailExist = async function(email) {
  const user = await this.findOne({ email });
  return !!user; // Returns true if user exists, false otherwise
};

// Check email is already exist or not
UserSchema.statics.isMobileNoExist = async function(mobileNo) {
  const user = await this.findOne({ mobileNo });
  return !!user; // Returns true if user exists, false otherwise
};


// Create and export the User model
const User = mongoose.model("User", UserSchema);
export default User;
