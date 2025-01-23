import { IUsersSchema } from "@/types";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema<IUsersSchema>(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value: string) => {
          return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
            value
          );
        },
        message: "Please enter a valid password",
      },
    },
    profilePicture: {
      type: String,
      default: "https://example.com/default-avatar.png",
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    isactive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    drafts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
    status: {
      type: String,
      enum: ["active", "banned", "suspended"],
      default: "active",
    },
    lastLogin: { type: Date },
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.users || mongoose.model<IUsersSchema>("users", userSchema);
export { UserModel };
