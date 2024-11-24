import mongoose, { Model, Document } from "mongoose";

interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  image?: string;
  password: string;
  emailVerified?: boolean;
  accessToken?: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: "Email is not valid",
    },
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value: string): boolean {
        return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(value);
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
export const Users: Model<IUser> = mongoose.models.user || mongoose.model<IUser>("user", UserSchema);
