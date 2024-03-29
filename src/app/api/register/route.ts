import connectDB from "@/database";
import User from "@/models/user";
import Joi from "joi";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
// import { ApiRegisterI } from "@/Interface";
import { NextApiRequest } from "next";

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password:Joi.string().min(6).required(),
    role:Joi.string().required()
})
export const dynamic =  'force-dynamic'
export async function POST(req:Request){
    await connectDB();
    const {name,email,password,role} = await req.json()
    //validate the schema
    const {error} = schema.validate({name,email,password,role})
    if(error){
        return NextResponse.json({
            success:false,
            message:email.details[0]
        })
    }


    try{
        //check if user is already exist or not
        const isUserAlreadyExists = await User.findOne({email})
        if(isUserAlreadyExists){
            return NextResponse.json({
                success:false,
                message:'User is already exists. Please try with different email'
            })
        }else{
            const hashPassword =  await hash(password,12)
            const newlyCreatedUser = await User.create({
                name,email,password:hashPassword,role
            })
            if(newlyCreatedUser){
                return NextResponse.json({
                    success:true,
                    message:'Account created successful'
                })
            }
        }
    }catch(error){
        console.log('Erorr is new user registration')
        return NextResponse.json({
            success:false,
            message:'Somethings went wrong! Please try again later'
        })
    }
}