import { NextApiResponse } from "next";
import { expertError } from "./ErrorExpert";

export const TryCatch =
  (controller: Function) =>
  async (request: Request, response: NextApiResponse, ...args: any[]) => {
    try {
      return await controller(request, response);
    } catch ({ error }: any) {
      expertError(error);
    }
  };
