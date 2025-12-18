



//Auth seller

import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/dist/types/server";

export async function GET(request){
  try {
   const {userId} =getAuth(request)
   const isSeller =await authSeller(userId)

   if(!isSeller){
    return NextResponse.json({error:'not authorized'},
        {status:401}
    )

   }
   

   const storeInfo=await prisma.store.findUnique()

  }catch(error){

  }


}