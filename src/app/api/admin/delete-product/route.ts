import connectDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export const DELETE = async(req:any)=>{
    try {
        await connectDB()

        const isAuthUser = await AuthUser(req)
         if(isAuthUser?.role === 'admin') {

             const {searchParams} = new URL(req.url)
             const id =searchParams.get('id')
             console.log('idddd', id);
             
             if(!id) return NextResponse.json({ success:false,message:' Product ID is required'})
             const deletedProduct = await Product.findByIdAndDelete(id)
            return deletedProduct ? NextResponse.json({success:true,message:'Product is deleted'}) : NextResponse.json({success:false,message:'Failed to delete product! Please try again later'});
             
         }else {
            return NextResponse.json({
                success:false,
                message:"You are not authorized to perform this action"
            })
         }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success:false,
            message:'Something went wrong ! Please try again later'
        })
    }
}