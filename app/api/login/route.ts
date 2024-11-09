import {NextResponse} from "next/server";
import {Users} from "@/schemas/users";
import {TryCatch} from "@/utils/trycatch";

export const POST=TryCatch( async(request: Request): Promise<any> => {
               const data:{email:string, password:string} =await request.json()
               console.log(">>",data)
               const isPresent = await Users.findOne({email:data.email})
               console.log(isPresent)
               return NextResponse.json({isPresent:isPresent});

});