import {NextResponse} from "next/server";

export const TryCatch = (controller:Function)=> async (request:Request, response:Response,statusCode:number, ...args:any[])=>{
    try{
        return await controller(request,response);
    }catch(error:{message:string}){
        return NextResponse.json({ error: error.message }, { headers: {statusCode:statusCode.toString()} });
    }
}