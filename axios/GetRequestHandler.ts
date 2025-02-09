import axios from "axios";

export async function GetRequestHandler() {
  return await axios(`${process.env.NEXT_PUBLIC_APP_API_URL}/signin`);
}
