import axios from "axios";

export async function PatchRequestHandler(endpoint: string, payload: any) {
  return await axios.patch(
    `${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`,
    {
      payload,
    }
  );
}
