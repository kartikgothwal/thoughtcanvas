import { GET_ALL_USERS } from "@/constant"
import axios from "axios"
export const getAllUsers =async ()=>{
    return await axios.post(GET_ALL_USERS)
}
