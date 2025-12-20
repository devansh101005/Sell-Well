

//auth admin

const { default: authAdmin } = require("@/middlewares/authAdmin")
const { getAuth } = require("@clerk/nextjs/server")
const { NextResponse } = require("next/server")

export async function GET(request){

    try {
       const {userId} =getAuth(request)
       const isAdmin =await authAdmin()

       if(!isAdmin){
        return NextResponse.json({error:'not authorized'},{status:401})
       }

       return NextResponse.json({isAdmin})

    }catch(error) {
        console.error(error);
        return NextResponse.json({error:error.code || error.message},{status:400})

    }
}