import CaptchaInput from "@/components/common/CaptchaInput";
import { loginSchema } from "@/utils/validateUtils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type LoginValuesProps = {
    username: string;
    password: string;
};

export interface LoginFormProps {
    onSubmit: (values: LoginValuesProps) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
    const { isLoading, error } = useAppSelector((state) => state.account);
    const { t } = useTranslation();
    const [isPassword, setIsPassword] = useState(false);
    const [isVerify, setVerify] = useState(false);

    const form = useForm<LoginValuesProps>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { handleSubmit } = form;

    const togglePassword = () => {
        setIsPassword(!isPassword);
    };

    const handleChangeCaptcha = useCallback((token: string | null) => {
        if (token) {
            setVerify(true);
        } else {
            setVerify(false);
        }
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("common.account")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder={t("form.placeholder.username")}
                                            {...field}
                                        />
                                    </FormControl>
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
                                    <FormLabel>{t("form.password")}</FormLabel>
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
                    {/* <CaptchaInput onChange={handleChangeCaptcha} /> */}
                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {t("error.accountInvalid")}
                        </div>
                    )}
                    <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            t("common.confirm")
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default memo(LoginForm);
