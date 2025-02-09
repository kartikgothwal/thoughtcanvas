import axios from "axios";

export async function DeleteRequestHandler(endpoint:string) {
  return await axios.delete(`${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`);
}
