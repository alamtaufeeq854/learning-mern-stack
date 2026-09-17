import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password, username } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "User doesn't exist !",
          success: false,
        },
        { status: 404 },
      );
    }

    const isVerified = await bcryptjs.compare(password, user.password);

    if (!isVerified) {
      return NextResponse.json(
        {
          message: "Invalid Password !",
          success: false,
        },
        { status: 400 },
      );
    }

    const tokenData = {
      id: user._id,
      username,
      email,
    };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "30d",
    });

    const response = NextResponse.json(
      { message: "Login successfully !", success: true },
      { status: 200 },
    );

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Something went wrong !",
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
