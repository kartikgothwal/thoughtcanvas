import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};

export async function DbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database Already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URL || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("database connected");
    return;
  } catch (error: any) {
    console.log("Database connection failed", error);
    process.exit()
  }
}
