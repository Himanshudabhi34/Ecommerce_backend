import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { sendResponse } from "../utils/HelperFunction.js";
import ResponseMessages from "../utils/ResponseMessages.js";
import { sendOTPEmail } from "../services/EmailService.js";

export const UserRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, mobileNo, password } = req.body;

    //  sendOTPEmail()
    // Check if email already exists using the static method
    const emailExists = await User.isEmailExist(email);
    if (emailExists) {
      return sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessages.EMAIL_EXIST
      );
    }

    // check mobileNo is exist or not
    const mobileNoExists = await User.isMobileNoExist(mobileNo);
    if (mobileNoExists) {
      return sendResponse(
        res,
        StatusCodes.BAD_REQUEST,
        ResponseMessages.MOBILENO_EXIST
      );
    }

    // Hash Password
    const hashedPassword = await User.hashPassword(password);

    // Generate and store OTP
    const otp = await User.generateOTP();

    const newUser = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNo: mobileNo,
      password: hashedPassword,
      otp: otp,
    });
    await newUser.save();
    return sendResponse(
      res,
      StatusCodes.CREATED,
      ResponseMessages.USER_CREATED
    );
  } catch (error) {
    return sendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR
    );
  }
};

export const VerifyOtp = async (req, res) => {
  try {
    const { id, otp } = req.body;
    const user = await User.findById({ _id: id });

    if (user) {
      const isOtpMatch = user.otp === otp;
      if (isOtpMatch) {
        const updateUser = await User.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              isVerified: true,
            },
          },
          {
            new: true,
          }
        );

        return sendResponse(
          res,
          StatusCodes.OK,
          ResponseMessages.INVALID_OTP,
          updateUser
        );
      } else {
        return sendResponse(res, StatusCodes.OK, ResponseMessages.INVALID_OTP);
      }
    }
  } catch (error) {
    return sendResponse(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ResponseMessages.INTERNAL_SERVER_ERROR
    );
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  // find User is exist or not
  const user = await User.findOne({ email, isActive: true, isDeleted: false });

  if (user) {
    // verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    const accessToken = await User.generateAccessToken();
    const refreshToken = await User.generateRefreshToken();

    if (isValidPassword) {
      if (accessToken && refreshToken) {
        const updateUser = await User.updateOne(
          { _id: user._id },
          {
            $set: {
              refreshToken:refreshToken
            },
          },
          {new:true}
        );
        return sendResponse(res, StatusCodes.OK, ResponseMessages.USER_LOGIN, updateUser)
      }
    }else{
      return sendResponse(res, StatusCodes.BAD_REQUEST, ResponseMessages.INVALID_CREDENTIAL)
    }
  }
};
