import connectDB from "@/database";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PUT = async (req: any) => {
  try {
    await connectDB();
    const extractData = await req.json();
    const {
      _id,
      name,
      description,
      price,
      category,
      sizes,
      deliveryInfo,
      onSale,
      priceDrop,
      imageUrl,
    } = extractData;
    const updateProduct = await Product.findOneAndUpdate(
      {
        _id,
      },
      {
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      },
      { new: true }
    );
    if(updateProduct){
        return NextResponse.json({
            success:true,
            message:'Product updated successfully'
        })
    }else{
        return NextResponse.json({
            success: false,
            message: "failed to update the product   ! Please try again later",
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
