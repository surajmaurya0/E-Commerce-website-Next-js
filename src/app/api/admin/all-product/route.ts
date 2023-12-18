import connectDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: any) => {
  try {
    await connectDB();
    const user = "admin";
    if (user === "admin") {

        const extractAllProduct = await Product.find({})
        if(extractAllProduct){
            return NextResponse.json({
                success:true,
                data:extractAllProduct
            })
        }else{
            return NextResponse.json({
                success:false,
                status:204,
                message:'No Product found'
            })
        }
    } else {
      return NextResponse.json({
        success: false,
        message: "You are not autorized",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong ! Please try again later",
    });
  }
};
