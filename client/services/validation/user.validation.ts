import z from "zod";

export const signupValidation = z.object({
  displayName: z
    .string()
    .min(3, "Display name should be mininum of 3 characters.")
    .max(32, "Display name should be no more than of 32 characters."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("This is not a valid E-mail."),
  password: z
    .string({
      required_error: "Password is required.",
    })
    .min(6, "Password should be min of 6 chars."),
  confirmPassword: z.string().min(1, "Password confirmation is required."),
});

export type SignupSchema = z.infer<typeof signupValidation>;

export const loginValidation = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Invalid Email or password."),
  password: z.string().min(1, "Password is required."),
});

export type LoginSchema = z.infer<typeof loginValidation>;

export const userValidation = z.object({
  displayName: z
    .string()
    .min(3, "Display name should be mininum of 3 characters.")
    .max(32, "Display name should be no more than of 32 characters.")
    .optional()
    .default("User"),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("This is not a valid E-mail."),
  phoneNumber: z
    .string()
    .min(1, "Phone number should be mininum of 1 character.")
    .max(25, "Phone number should be no more than 25 characters.")
    .optional()
    .default("")
    .or(z.literal("")),

  status: z
    .string()
    .max(250, "Your status should be no more than 250 characters.")
    .optional()
    .default("Hey there I am using chat app...")
    .or(z.literal("")),
  address: z.object({
    country: z.string().min(2).optional().or(z.literal("")),
    city: z.string().min(2).optional().or(z.literal("")),
    postalCode: z.string().min(1).optional().or(z.literal("")),
  }),
  birthDate: z.string().optional().or(z.literal("")),
});
