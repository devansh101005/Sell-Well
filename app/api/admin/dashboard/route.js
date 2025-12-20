//Get Dash board data for Admin 9total orders,total stores,total products,total revenue

import prisma from "@/lib/prisma"
import authAdmin from "@/middlewares/authAdmin"
import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"



export async function GET(request){

try {
const {userId} =getAuth(request)
    const {isAdmin} =await authAdmin(userId)

    if(!isAdmin){
        return NextResponse.json({error:'not authorized'},{status:401})

    }

    //get total orders

    const orders=await prisma.order.count()

    //get the total stores on app
    const stores=await prisma.store.count()

    //Get all orders include only createAt and total and calculate total revenue



    const allOrders=await prisma.order.findMany({
        select:{
            createdAt:true,
            total:true,
        }
    })

    let totalRevenue=0
    allOrders.forEach(order=> {
        totalRevenue+= order.total
    })

    const revenue=totalRevenue.toFixed(2)

    //total products on app

    const products=await prisma.product.count()
    const dashboardData={
        orders,
        stores,
        products,
        revenue,
        allOrders
    }

    return NextResponse.json({dashboardData})
}catch(error){
console.error(error);
return NextResponse.json({error:error.code || error.message}, {status:400})
}

}