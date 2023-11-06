import connectDB from "@/database";
import Product from "@/models/product";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  sizes: Joi.array().required(),
  deliveryInfo: Joi.string().required(),
  onSale: Joi.string().required(),
  priceDrop: Joi.number().required(),
  imageUrl: Joi.string().required(),
});

export const dynamic = "force-dynamic";

export const POST = async (req: any) => {
  try {
    await connectDB();
    const user = "admin";
    if (user === "admin") {
      const extractData = await req.json();
      const {
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

      const { error } = AddNewProductSchema.validate({
        name,
        description,
        price,
        category,
        sizes,
        deliveryInfo,
        onSale,
        priceDrop,
        imageUrl,
      });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }

      const newlyCreatedProduct = await Product.create(extractData)
      return newlyCreatedProduct ? NextResponse.json({
          success:true,
          message:'Product Added Successful'
      }) : NextResponse.json({
          success:false,
          message:'Faild to add the product ! please try again'
      });

    } else {
      return NextResponse.json({
        success: false,
        message: "You are not atorized !",
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
