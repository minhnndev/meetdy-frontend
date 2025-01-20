import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { forgotPasswordSchema } from "@/utils/validateUtils";
import { useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type ForgotPasswordValuesProps = {
    pin: string;
    password: string;
    passwordConfirm: string;
};

export interface ForgotPasswordFormProps {
    isCounting: boolean;
    remainingTime: number;
    onSubmit: (values: ForgotPasswordValuesProps) => void;
    resendCode?: () => void;
}

const ForgotPasswordForm = ({
    isCounting,
    remainingTime,
    onSubmit,
    resendCode,
}: ForgotPasswordFormProps) => {
    const { isLoading } = useAppSelector((state) => state.account);
    const { t } = useTranslation();
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const form = useForm<ForgotPasswordValuesProps>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            pin: "",
            password: "",
            passwordConfirm: "",
        },
        mode: "onChange",
    });

    const { handleSubmit, formState } = form;
    const { isValid } = formState;

    const togglePassword = () => {
        setIsPassword(!isPassword);
    };

    const togglePasswordConfirm = () => {
        setIsPasswordConfirm(!isPasswordConfirm);
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-2 justify-center">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} inputMode="numeric" />
                                                <InputOTPSlot index={1} inputMode="numeric" />
                                                <InputOTPSlot index={2} inputMode="numeric" />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={3} inputMode="numeric" />
                                                <InputOTPSlot index={4} inputMode="numeric" />
                                                <InputOTPSlot index={5} inputMode="numeric" />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription className="text-center">
                                        {t("form.description.verify")}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("form.newPassword")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={isPassword ? "text" : "password"}
                                                placeholder={t("form.placeholder.password")}
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={togglePassword}
                                                aria-label={
                                                    isPassword ? "Hide password" : "Show password"
                                                }
                                            >
                                                {isPassword ? (
                                                    <Eye className="h-4 w-4" />
                                                ) : (
                                                    <EyeClosed className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("form.newPasswordConfirm")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={isPasswordConfirm ? "text" : "password"}
                                                placeholder={t("form.placeholder.passwordConfirm")}
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={togglePasswordConfirm}
                                                aria-label={
                                                    isPasswordConfirm
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                            >
                                                {isPasswordConfirm ? (
                                                    <Eye className="h-4 w-4" />
                                                ) : (
                                                    <EyeClosed className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-4 text-center text-sm">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            disabled={isCounting}
                            onClick={resendCode}
                        >
                            {isCounting
                                ? `${t("common.resendIn")} ${remainingTime}s`
                                : t("common.resend")}
                        </Button>
                        <Button type="submit" disabled={!isValid || isLoading} className="w-full">
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                t("common.confirm")
                            )}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default memo(ForgotPasswordForm);
