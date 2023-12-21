import connectDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const GET = async (req: any) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get("id");

    if (!productId) {
      return NextResponse.json({
        success: false,
        status: 400,
        message: "Product id is Required",
      });
    }
    const getData = await Product.find({ _id: productId });
    if (getData && getData.length) {
      return NextResponse.json({
        success: true,
        data: getData[0],
      });
    } else {
      return NextResponse.json({
        success: false,
        status: 204,
        messgae: "No Product Found",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again",
    });
  }
};
