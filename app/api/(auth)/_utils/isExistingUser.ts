import { UserModel } from "@/schema";
import { IUsersSchema } from "@/types";

export default async function ExistingUser(email: string): null | IUsersSchema {
  const isExisted: IUsersSchema | null = await UserModel.findOne({
    email: payload.email,
  });
}
