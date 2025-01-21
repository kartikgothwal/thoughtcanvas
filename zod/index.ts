import { z } from "zod";

export const SignUpFormSchema = z.object({
    firstname: z
      .string()
      .min(3, "Firstname must greater than 3 characters")
      .max(25, "Firstname must less than 25 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "must contain only letters, numbers and underscore (_)"
      ),
    lastname: z
      .string()
      .min(3, "Lastname must greater than 3 characters")
      .max(25, "Lastname must less than 25 characters")
      .regex(   
        /^[a-zA-Z0-9_]+$/,
        "must contain only letters, numbers and underscore (_)"
      ),
    email: z.string().email("Email must be a valid email address"),
    password: z
      .string()
      .min(8, "Password must greater than 8 characters")
      .max(12, "Password must less than 12 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{8,12}$/,
        "must be 8-12 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });