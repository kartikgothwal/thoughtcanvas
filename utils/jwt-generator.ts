import jwt from "jsonwebtoken"

export async function jwtKeysGenerator(data:string){
    return await jwt.sign(data,process.env.PRIVATE_KEY!, {expiresIn:"5m"})
}