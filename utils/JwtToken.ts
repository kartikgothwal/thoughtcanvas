import { TryCatch } from "./TryCatch";
import JWT from "jsonwebtoken";

export const generateJwtToken = TryCatch(async (email: string) => {
  const Accesstoken: string = JWT.sign({ email }, process.env.PRIVATE_KEY!, {
    algorithm: "RS256",
    expiresIn: "10m",
  });
  const RefreshToken = JWT.sign({ email }, process.env.PRIVATE_KEY!, {
    algorithm: "RS256",
    expiresIn: "1y",
  });
  return { Accesstoken, RefreshToken };
});
export const verifyToken = TryCatch(async (token: string) => {
  const isVerify = JWT.verify(token, process.env.PUBLIC_KEY!, {
    algorithms: ["RS256"],
  });
  if(isVerify){
    return isVerify
  }else{
    // next(error)
  }
});
