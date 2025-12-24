//Add new coupn

import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST (request){
    try {
     const {userId}=getAuth()
        const isAdmin =await authAdmin(userId)

        if(!isAdmin){
            return NextResponse.json({error:"not authorised"},{status:401})
        }
        const {coupon} =await request.json()
        coupon.code=coupon.code.toUpperCase()

        await prisma.coupon.create({data:coupon})

        return NextResponse.json({message:"Coupn added succesfully"})

    }catch(error) {
        console.error(error)
        return NextResponse.json({error:error.code || error.message},{status:400})
    }
}

//Delete coupn 

export async function DELETE(request){

    try {
    const {userId}=getAuth()
        const isAdmin =await authAdmin(userId)

        if(!isAdmin){
            return NextResponse.json({error:"not authorised"},{status:401})
        }

        const {searchParams} =request.nextURL;
        const code =searchParams.get('code')

        await prisma.coupon.delete({where:{code}})
        return NextResponse.json({message:'Coupon deleted successfully'})

    }catch(error) {
        console.error(error)
        return NextResponse.json({error:error.code || error.message},{status:400})

    }
}

export async function GET(request){
    try {
        const {userId} =getAuth()
        const isAdmin=await authAdmin(userId)

        if(!isAdmin) {
            return NextResponse.json({error:"not authorised"},{status:400})
        }
        const coupons =await prisma.coupon.findMany({})
        return NextResponse.json({coupons})
    } catch(error) {
    console.error(error)
    return NextResponse.json({error:error.code || error.message}, {status:400})
    }
}