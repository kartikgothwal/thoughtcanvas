import { DbConnection } from "@/types";
import mongoose from "mongoose";

const connection: DbConnection = {};
export default async function dbConnect() {
    console.log('inside')
  if (connection.isConnected) {
    console.log("Database is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL || "", {});
    console.log("🚀 ~ dbConnect ~ db:", db);
    console.log("Database is already connected");
  } catch (error: unknown) {
    console.error("Error connecting the database", error);
    process.exit(1);
  }
}
