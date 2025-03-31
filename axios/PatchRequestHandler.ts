import axios from "axios";

export async function PatchRequestHandler(
  endpoint: string,
  payload: any,
  token?: string
) {
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`,
    {
      payload,
    },
    {
      headers: {
        Authorization: `Bearer ${token+"d"}`,
        "Content-Type": "application/json",
      },
    }
  );
}
