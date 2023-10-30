import  jwt  from 'jsonwebtoken';
import connectDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";


const schema = Joi.object({
    token: Joi.string().required(),
})

export const POST =async(req: Request)=>{
    await connectDB();
    const  {token}  = await req.json()
    const {error} = schema.validate({token})
    if(error){
        return NextResponse.json({
            success:false,
            message:error.details[0].message
        })
    }

    try {
        const decoded = jwt.verify(token, "default_secret_key");
        return NextResponse.json({
                        success:true,
                        message:decoded
      })
      
    }catch(error){
        return NextResponse.json({
                    success:false,
                    message:error
                })
    }
}