import {NextResponse} from "next/server";

export const TryCatch = (controller:Function)=> async (request:Request, response:Response,statusCode:number, ...args:any[])=>{
    try{
        return await controller(request,response);
    }catch({error}:any){
        const status:number = statusCode ?? 500; 
         return NextResponse.json({ error: error }, { headers: {status:status.toString()} });
    }
}