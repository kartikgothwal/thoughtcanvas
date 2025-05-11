import { UserModel } from "@/schema/users";
 
export async function findDbUser(payload) {
  return await UserModel.findOne(payload);
}
