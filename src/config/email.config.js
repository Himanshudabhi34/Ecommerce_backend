import { Resend } from "resend";

export const sendEmail = new Resend(process.env.SEND_EMAIL_API_KEY);
