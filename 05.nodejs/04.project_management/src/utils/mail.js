import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Task Manager",
      link: "https://taskmanagelink.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.error(
      "Email Service failed Silently. make sure you have provided your MAILTRAP credentials in the .env file",
    );
    console.log("Error:", error);
  }
};

const emailVerificationMailgenContent = (username, verificationurl) => {
  return {
    body: {
      name: username,
      intro: "Welcome to our App ! we're excited to have you on board",
      action: {
        instructions:
          "To verify your Email please click on the following button",
        button: {
          color: "#22BB66",
          text: "verify your email",
          link: verificationurl,
        },
      },
      outro: "Need help or have questions ? Email us, we'd love to help you !",
    },
  };
};

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
  return {
    body: {
      name: username,
      intro: "You Want to reset your Password !",
      action: {
        instructions: "Click on the button to reset password",
        button: {
          color: "#22BB66",
          text: "Reset Password",
          link: passwordResetUrl,
        },
      },
      outro: "Need help or have questions ? Email us, we'd love to help you !",
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
