import { t } from "i18next";
import { z } from "zod";

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^[0-9]{10,15}$/;
export const loginSchema = z.object({
    username: z
        .string()
        .nonempty(t("form.error.username.required"))
        .refine((value) => regexEmail.test(value) || regexPhone.test(value), {
            message: t("form.error.username.invalid"),
        }),
    password: z
        .string()
        .min(8, t("form.error.password.invalid"))
        .max(50, t("form.error.password.invalid")),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .nonempty(t("form.error.name.required"))
            .max(50, t("form.error.name.invalid")),
        username: z
            .string()
            .nonempty(t("form.error.username.required"))
            .refine((value) => regexEmail.test(value) || regexPhone.test(value), {
                message: t("form.error.username.invalid"),
            }),
        password: z
            .string()
            .min(8, t("form.error.password.invalid"))
            .max(50, t("form.error.password.invalid")),
        passwordConfirm: z.string().nonempty(t("form.error.passwordConfirm.required")),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: t("form.error.passwordConfirm.mismatch"),
    });

export const verifySchema = z.object({
    pin: z.string().min(6, {
        message: t("form.error.pin.invalid"),
    }),
});

export const enterUsernameSchema = z.object({
    username: z
        .string()
        .nonempty(t("form.error.username.required"))
        .refine((value) => regexEmail.test(value) || regexPhone.test(value), {
            message: t("form.error.username.invalid"),
        }),
});

export const forgotPasswordSchema = z
    .object({
        pin: z.string().min(6, {
            message: t("form.error.pin.invalid"),
        }),
        password: z
            .string()
            .min(8, t("form.error.password.invalid"))
            .max(50, t("form.error.password.invalid")),
        passwordConfirm: z.string().nonempty(t("form.error.passwordConfirm.required")),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: t("form.error.passwordConfirm.mismatch"),
    });

export const updateProfileSchema = z.object({
    name: z.string().nonempty(t("form.error.name.required")).max(50, t("form.error.name.invalid")),
    dob: z
        .string()
        .optional()
        .refine(
            (value) => {
                if (!value) return true;

                const [year, month, date] = value.split("-").map(Number);
                if (!year || !month || !date) return false;
                if (month < 1 || month > 12) return false;
                if (date < 1) return false;

                const daysInMonth =
                    month === 2
                        ? year % 4 === 0
                            ? 29
                            : 28
                        : [1, 3, 5, 7, 8, 10, 12].includes(month)
                          ? 31
                          : 30;

                if (date > daysInMonth) return false;
                return true;
            },
            { message: t("form.error.dob.invalid") }
        )
        .refine(
            (value) => {
                if (!value) return true;

                const dob = new Date(value);
                return dob <= new Date();
            },
            { message: t("form.error.dob.cannotBeInTheFuture") }
        ),
    gender: z.string().nonempty(t("form.error.gender.required")),
});

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().nonempty(t("form.error.password.required")),
        newPassword: z
            .string()
            .min(8, t("form.error.password.invalid"))
            .max(50, t("form.error.password.invalid")),
        passwordConfirm: z.string().nonempty(t("form.error.passwordConfirm.required")),
    })
    .refine((data) => data.newPassword === data.passwordConfirm, {
        path: ["passwordConfirm"],
        message: t("form.error.passwordConfirm.mismatch"),
    });
