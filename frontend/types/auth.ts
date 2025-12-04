import { z } from 'zod';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
}

export const LoginSuccessSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.union([z.number(), z.string()]).transform(Number), // accept both "5" and 5
    username: z.string(),
    role: z.string(),
  }),
});

// Optional: also accept wrapped responses some people use
export const WrappedLoginSchema = z.object({
  data: LoginSuccessSchema,
  message: z.string().optional(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number(),
    username: z.string(),
    role: z.string(),
  }),
});