import {NextResponse} from "next/server";

export const TryCatch = (controller:Function)=> async (request:Request, response:Response,statusCode:number, ...args:any[])=>{
    try{
        return await controller(request,response);
    }catch({error}:{message:string}){
        const status:number = statusCode ?? 500; // Default to 500 if not provided
        return NextResponse.json({ error: error.message }, { headers: {status:status.toString()} });
    }
}