import connectDB from "@/database"
import AuthUser from "@/middleware/AuthUser"
import Address from "@/models/address"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export const GET  =async (req:any) => {
    try {
        await connectDB()
        const {searchParams}= new URL(req.url)
        const id= searchParams.get('id')
        if(!id){
          return NextResponse.json({
            success:false,
            message:'You are not logged in'
          })  
        }
        const isAuthUser = await AuthUser(req)
        if(isAuthUser){
            const getAllAdress = await Address.find({userID:id})
            if(getAllAdress){
                return NextResponse.json({
                    success:true,
                    data:getAllAdress
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:'failed to get address ! Please try again'
                })
            }
        }else{
            return NextResponse.json({
                success:false,
                message:'You are not Authorize user'
            })
        }
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Something went wrong ! Please try again later'
        })
        
    }
    
}