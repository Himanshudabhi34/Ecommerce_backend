import { Resend } from "resend";


// const sendEmail = new Resend(process.env.SEND_EMAIL_API_KEY);
const sendEmail = new Resend('re_YKwARqCH_Jy1xw7iHjGquqfdYyJwUG6zn');

// send Otp Email


export const sendOTPEmail = async () => {
  try {
    const response = await sendEmail.emails.send({
      from: "himanshudabhi012@gmail.com",
      to: ["himanshudabhi.vhits@gmail.com"],
      subject: "hello world",
      html: "<p>it works!</p>",
    });
    console.log(response, ":Response");
  } catch (error) {
    console.log(error, ":Error");
  }
};

