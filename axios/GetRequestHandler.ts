import axios from "axios";

export async function GetRequestHandler(endpoint:string) {
  return await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`);
}
