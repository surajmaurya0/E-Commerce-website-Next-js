import connectDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (req: any) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "address ID is required",
      });
    }
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const deletedAddress = await Address.findByIdAndDelete(id);
      if (deletedAddress) {
        return NextResponse.json({
          success: true,
          message: "Address is deleted successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Failed to delete address ! Please try again",
        });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not authorize user",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
};
