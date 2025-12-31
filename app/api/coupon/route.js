


//Verify Coupon 

import prisma from "@/lib/prisma"
import { useAuth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(request){
    try {

    const {userId, has} = useAuth(request)
    const { code } = await request.json()

    const coupon = await prisma.coupon.findUnique({
    where: {code: code.tolpperCase(),
    expiresAt: {gt: new Date()}
    }
})

if (!coupon){
    return NextResponse.json({error: "Coupon not found"},{status:404})
}

if (coupon.forNewUser) {
    const userOrders = await prisma.order.findMany({
        where: { userId }
    })
    
    if (userOrders.length > 0) {
        return NextResponse.json(
            { error: "Coupon valid for new users" },
            { status: 400 }
        )
    }
}

if (coupon.forMembers) {
    const hasPlusPlan = has({ plan: 'plus' })
    if (!hasPlusPlan) {
        return NextResponse.json(
            { error: "Coupon valid for members only" },
            { status: 400 }
        )
    }
}

}catch(error){
  console.error(error);
  return NextResponse.json({error: error.code || error.message},{status:400})
    }
}