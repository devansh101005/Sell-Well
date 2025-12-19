//Get store info and products

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
     

        //Get store username from query params 
        const {searchParams }=new URL(request.url)
        const username=searchParams.get('username').toLowerCase();

        if(!username){
            return NextResponse.json({error:"Missing username"},{status:400})
        }

        const store =await prisma.store.findUnique({
            where:{username,isActive:true},
            include:{Product:{include:{rating:true}}}
        })

        if(!store){
            return  NextResponse.json({error:"store not foud"},{status:400})
        }
        return NextResponse.jsn({store})
    } catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400})

    }
}