import { z } from "zod";
import { t } from "i18next";

const PHONE_REGEX = /^0[0-9]{9,10}$/;

export const loginSchema = z.object({
  email: z.string().trim(),
  password: z.string().trim(),
});

export const registerSchema = z.object({
  firstName: z
    .string({ required_error: `${t("validation.firstName")}` })
    .min(1, {
      message: `${t("validation.firstName")}`,
    })
    .trim(),
  lastName: z
    .string({ required_error: `${t("validation.lastName")}` })
    .min(1, {
      message: `${t("validation.lastName")}`,
    })
    .trim(),
  phone: z
    .string({ required_error: `${t("validation.phoneRequire")}` })
    .min(1, { message: `${t("validation.phoneRequire")}` })
    .regex(PHONE_REGEX, `${t("validation.phoneInvalid")}`),
  email: z
    .string({ required_error: `${t("validation.emailRequire")}` })
    .email({ message: `${t("validation.emailInvalid")}` })
    .trim(),
});

export const userActivateSchema = z.object({
  activateToken: z.string().min(1),
  userId: z.string().uuid(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: `${t("validation.emailRequire")}` })
    .email({ message: `${t("validation.emailInvalid")}` })
    .trim(),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, `${t("validation.newPasswordLength", { min: 8 })}`)
      .regex(/[A-Z]/, `${t("validation.newPasswordUppercase")}`)
      .regex(/[a-z]/, `${t("validation.newPasswordLowercase")}`)
      .regex(/\d/, `${t("validation.newPasswordNumber")}`)
      .regex(/[^A-Za-z0-9]/, `${t("validation.newPasswordSymbol")}`)
      .refine((data) => {
        return !data.includes(" ");
      }, "Password must not contain spaces."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: `${t("validation.confirmPasswordMatch")}`,
    path: ["confirmPassword"],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPassword = z.infer<typeof forgotPasswordSchema>;
export type UserActivateType = z.infer<typeof userActivateSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
