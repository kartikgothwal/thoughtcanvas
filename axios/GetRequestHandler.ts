import axios from "axios";

export async function GetRequestHandler(endpoint: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`
  );
  return response;
}
