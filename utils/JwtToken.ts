import { expertError } from "./ErrorExpert";
 
import JWT from "jsonwebtoken";

export const generateJwtToken = async (email: string) => {
  try {
    const Accesstoken: string = JWT.sign({ email }, process.env.PRIVATE_KEY!, {
      algorithm: "RS256",
      expiresIn: "10m",
    });
    const RefreshToken = JWT.sign({ email }, process.env.PRIVATE_KEY!, {
      algorithm: "RS256",
      expiresIn: "1y",
    });
    return { Accesstoken, RefreshToken };
  } catch (error: any) {
    error.message = "Failed while creating the tokens";
    return error;
  }
};
export const verifyToken = async (token: string) => {
  try {
    const isVerify = JWT.verify(token, process.env.PUBLIC_KEY!, {
      algorithms: ["RS256"],
    });
    if (isVerify) {
      return isVerify;
    } else {
      const error: any = new Error("failed while verifying the token");
      expertError(error);
    }
  } catch (error) {
    return error;
  }
};
