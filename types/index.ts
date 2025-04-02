import mongoose from "mongoose";
import { Document } from "mongoose";
export interface DbConnection {
  isConnected?: number;
}
export interface RouteProps {
  href: string;
  label: string;
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
  token?: string;
}
export interface IErrorResponse {
  success: boolean;
  message: string;
  error?: unknown;
  statusCode: number;
}
export interface ISignInSignUpModalProps {
  openSignInModel: boolean;
  openSignUpModel: boolean;
  setOpenSignInModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSignupModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  status: string;
}

export interface IUserSignInResponse {
  id: unknown;
  name: string;
  email: string;
  profilePicture: string;
  role: string;
  isActive: boolean;
  status: string;
}
