//Get Dashboard data from seller 

import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import authSeller from "@/middlewares/authSeller";
import prisma from "@/lib/prisma";


export async function GET(request){
    try {
       const {userId} =getAuth(request)
       const storeId =await authSeller(userId)

       //Get all orderds for seller 
       const orders =await prisma.order.findMany({where:{storeId}})

       


    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400})

    }
}