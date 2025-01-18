import mongoose from "mongoose";

export interface DbConnection {
  isConnected?: number;
}
export interface statsProps {
  quantity: string;
  description: string;
}
export interface IUsersSchema extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  role: "user" | "admin";
  posts?: mongoose.Types.ObjectId[];
  bookmarks?: mongoose.Types.ObjectId[];
  isactive: boolean;
  createdAt: Date;
  updatedAt: Date;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  drafts?: mongoose.Types.ObjectId[];
  status: "active" | "banned" | "suspended";
  lastLogin: Date;
  liked?: mongoose.Types.ObjectId[];
  comments?: mongoose.Types.ObjectId[];
}
