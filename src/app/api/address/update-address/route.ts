import connectDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PUT = async (req: any) => {
  try {
    await connectDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const date = await req.json();
      const { _id, fullName, city, address, country, postalCode } = date;
      const updateAddress = await Address.findOneAndUpdate(
        {
          _id: _id,
        },
        { fullName, city, address, country, postalCode },
        { new: true }
      );
      if (updateAddress) {
        return NextResponse.json({
          success: false,
          message: "Address update successfuly",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to updat e address || Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorized user",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
};
