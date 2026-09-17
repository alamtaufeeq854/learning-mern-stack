import nodemailer from "nodemailer";
import User from "@/models/userModel";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = crypto.randomBytes(32).toString("hex");

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOptions = {
      from: "test@example.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
  <p>
    Click 
    <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
      here
    </a>
    to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}.
  </p>

  <p>
    Or copy and paste this link into your browser:
  </p>

  <p>
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
  </p>
`,
    };
    const mailresponse = await transport.sendMail(mailOptions);

    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
