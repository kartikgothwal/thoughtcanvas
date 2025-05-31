import { UserModel } from "@/schema/users";

export async function findDbUser(payload: any) {
  return await UserModel.findOne(payload);
}
