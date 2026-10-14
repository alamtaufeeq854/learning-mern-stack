const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

exports.register = async (request, reply) => {
  try {
    const { name, email, password, country } = request.body;

    if (!name || !email || !password || !country) {
      return reply
        .status(400)
        .send({ message: "All fields are required !", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 13);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      country,
    });

    await newUser.save();

    reply
      .code(201)
      .send({ msg: "User registered successfully !", success: true });
  } catch (err) {
    reply.send(err);
  }
};

exports.login = async (request, reply) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply
        .status(400)
        .send({ msg: "All fields are required !", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return reply
        .status(400)
        .send({ msg: "Invalid email or password !", success: false });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return reply
        .status(400)
        .send({ msg: "Invalid email or password !", success: false });
    }

    const token = request.server.jwt.sign({ id: user._id });

    reply.send({ token });
  } catch (err) {
    reply.send(err);
  }
};

exports.forgotPassword = async (request, reply) => {
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return reply.notFound("User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetPasswordExpire;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:${process.env.PORT}/api/auth/reset-password/${resetToken}`;

    reply.send({ resetUrl });
  } catch (err) {
    reply.send(err);
  }
};

exports.resetPassword = async (request, reply) => {
  const resetToken = request.params.token;
  const { newPassword } = request.body;

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return reply.badRequest("Invalid or expired password reset token");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 13);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;

  await user.save();

  reply.send({ message: "Password reset successfully", success: true });
};

exports.logout = async (request, reply) => {
  //JWT are stateless, use strategy like refresh token or blacklist token for more

  return reply.send({
    message: "Logout successful",
    success: true,
  });
};
