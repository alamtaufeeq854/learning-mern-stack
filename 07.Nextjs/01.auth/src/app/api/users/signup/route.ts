import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (user) {
      return NextResponse.json(
        {
          message: "User already exist with this email or username",
          success: false,
        },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          message: "At Least 8 characters are required for Password !",
          success: false,
        },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    await sendEmail({ email, emailType: "VERIFY", userId: newUser._id });
    return NextResponse.json(
      {
        message: "User Created Successfully !",
        success: true,
        newUser,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
        message: "Something went wrong ! Try Again",
        success: false,
      },
      { status: 500 },
    );
  }
}
