import { registerSchema } from "@/utils/validateUtils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type RegisterValuesProps = {
    name: string;
    username: string;
    password: string;
    passwordConfirm: string;
};

export interface RegisterFormProps {
    onSubmit: (values: RegisterValuesProps) => void;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
    const { isLoading } = useAppSelector((state) => state.account);
    const { t } = useTranslation();
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
    const [isVerify, setVerify] = useState(false);

    const form = useForm<RegisterValuesProps>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            passwordConfirm: "",
        },
    });

    const { handleSubmit } = form;

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
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("form.name")}</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder={t("form.placeholder.name")}
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
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
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
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="passwordConfirm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("form.passwordConfirm")}</FormLabel>
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
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2">
                            <div>
                                <Checkbox
                                    checked={isVerify}
                                    id="terms1"
                                    onCheckedChange={(e) => setVerify(e.valueOf() as boolean)}
                                />
                            </div>
                            <label
                                htmlFor="terms1"
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {t("form.terms")}
                            </label>
                        </div>
                    </div>
                    <Button type="submit" disabled={!isVerify || isLoading} className="w-full">
                        {isLoading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            t("common.register")
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default memo(RegisterForm);
