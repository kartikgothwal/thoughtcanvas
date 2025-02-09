import axios from "axios";

export async function PostRequestHandler(endpoint: string, payload: any) {
  return await axios.post(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`,
    {
      payload,
    }
  );
}
