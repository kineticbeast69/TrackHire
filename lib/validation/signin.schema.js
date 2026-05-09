import z from "zod";

const signinSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Invalid email address."),
  password: z
    .string()
    .trim()
    .min(1, "Password is required.")
    .min(8, "Atleast 8 characters required.")
    .max(50, "Max 50 characters is allowed.")
    .regex(/[A-Z]/, "At least one uppercase letter.")
    .regex(/[a-z]/, "At one lowercase letter.")
    .regex(/[0-9]/, "At least one number.")
    .regex(/[^a-zA-Z0-9]/, "At least one special characters."),
});
export default signinSchema;
