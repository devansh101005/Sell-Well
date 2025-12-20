//approve seller

import prisma from "@/lib/prisma"

const { default: authAdmin } = require("@/middlewares/authAdmin")
const { getAuth } = require("@clerk/nextjs/server")
const { NextResponse } = require("next/server")


export async function POST(request){

    try {
    const {userId} =getAuth(request)
    const isAdmin =await authAdmin(userId)

    if(!isAdmin){
        return NextResponse.json({error:'not authorized'},{status:401})
    }
    const {storeId,status}=await request.json()

    if(status==='approved'){
        await prisma.store.update({
            where: {id:storeId},
            data:{status:"approved",isActive:true}
        })
    }
    else if(status==='rejected'){
        await prisma.store.update({
            where: {id:storeId},
            data:{status:"rejected"}
        })
    }

    return NextResponse.json({message:status+'successfully'})
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400})

    }
}

//get all pending or rejected store


export async function POST(request){

    try {
    const {userId} =getAuth(request)
    const isAdmin =await authAdmin(userId)

    if(!isAdmin){
        return NextResponse.json({error:'not authorized'},{status:401})
    }
    const stores=await prisma.store.findMany({
        where:{status:{in:["pending","rejected"]}},
        include:{user:true}
    })

    return NextResponse.json({stores})
    }catch(error){
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400})

    }
}

