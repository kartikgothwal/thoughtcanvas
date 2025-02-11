import axios from "axios";

export async function PostRequestHandler(
  endpoint: string,
  payload: unknown,
  token?: string  
) {
  if (token) {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`,
      payload
    );
  }
}
