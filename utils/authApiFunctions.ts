import { USER_LOGIN } from "@/constant"
import axios from "axios"
export const login = async (email:string)=>{
    return await axios.post(USER_LOGIN, {
        email:email
    })
}
