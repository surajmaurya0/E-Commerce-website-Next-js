import connectDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const AddToCart = Joi.object({
  userId: Joi.string().required(),
  productId: Joi.string().required(),
});

export const POST = async (req: any) => {
  try {
    await connectDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const data = await req.json();
      const { productID, userID } = data;
      const { error } = AddToCart.validate({ userID, productID });
      if (error) {
        return NextResponse.json({
          success: false,
          message: error.details[0].message,
        });
      }
      const isCurrectCartItemAlreadyExists = await Cart.find({
        productID,
        userID,
      });
      if (isCurrectCartItemAlreadyExists) {
        return NextResponse.json({
          success: false,
          message: "This item already exists in your cart.",
        });
      }
      const saveProductToCart = await Cart.create(data)
      if(saveProductToCart){
        return NextResponse.json({
            success: true,
            message: "Product is added to cart !",
          });
      }else{
        return NextResponse.json({
            success: false,
            message: "Failed to add the product to cart ! Please try again ",
          });
      }
    } else {
      return NextResponse.json({
        success: false,
        message: "Unauthorized Access!",
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
