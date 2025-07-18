import z from "zod";

export const LoginDto = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterDto = z.object({
  email: z.string().email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string(),
  lastName: z.string(),
});
export type LoginRequest = z.infer<typeof LoginDto>;
export type RegisterRequest = z.infer<typeof RegisterDto>;

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };
}
