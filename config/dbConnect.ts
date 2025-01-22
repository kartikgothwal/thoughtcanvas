import { DbConnection } from "@/types";
import mongoose from "mongoose";

const connection: DbConnection = {};
export default async function dbConnect() {
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL || "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Database is successfully connected");
  } catch (error: unknown) {
    console.error("Error connecting the database", error);
    process.exit(1);
  }
}
