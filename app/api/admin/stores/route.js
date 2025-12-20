import prisma from "@/lib/prisma"

const { default: authAdmin } = require("@/middlewares/authAdmin")
const { getAuth } = require("@clerk/nextjs/server")
const { NextResponse } = require("next/server")


//get all approved stores


export async function POST(request){

    try {
    const {userId} =getAuth(request)
    const isAdmin =await authAdmin(userId)

    if(!isAdmin){
        return NextResponse.json({error:'not authorized'},{status:401})
    }
    const stores=await prisma.store.findMany({
        where:{status:'approved'},
        include:{user:true}
    })

    return NextResponse.json({stores})
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400})

    }
}

