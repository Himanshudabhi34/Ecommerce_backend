import User from "../models/User.js";


export const UserRegister = async(req, res) => {
  console.log(req.body)
  const newUser = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    mobileNo: 1234567890,
    password: 'hashedpassword',
    accessToken: 'access_token_here',
    refreshToken: 'refresh_token_here',
  });

  // Generate and store OTP
  const otp = newUser.generateOTP();

  console.log(otp, ":otp")
}

