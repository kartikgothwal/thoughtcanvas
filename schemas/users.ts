import mongoose, { Model, Document } from "mongoose";

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  image?: string;
  password: string | null;
  emailVerified?: boolean;
  accessToken?: string;
  isVerified: boolean;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string): boolean {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Email is not valid",
    },
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: false,
    validate: {
      validator: function (value: string): boolean {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        );
      },
      message: "Password is not valid",
    },
  },
  emailVerified: { type: Boolean },
  accessToken: {
    type: String,
  },
});

// Check if the model already exists before defining it
export const UsersModel: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", UserSchema);
