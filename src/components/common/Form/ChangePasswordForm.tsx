import { changePasswordSchema } from "@/utils/validateUtils";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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

export type ChangePasswordValuesProps = {
    currentPassword: string;
    newPassword: string;
    passwordConfirm: string;
};

export interface ChangePasswordFormProps {
    onSubmit: (values: ChangePasswordValuesProps) => void;
    onCancel?: () => void;
}

const ChangePasswordForm = ({ onSubmit, onCancel }: ChangePasswordFormProps) => {
    const { t } = useTranslation();
    const { isLoading } = useAppSelector((state) => state.account);

    const [isCurrentPassword, setIsCurrentPassword] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    const form = useForm<ChangePasswordValuesProps>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            passwordConfirm: "",
        },
    });

    const { handleSubmit } = form;

    const toggleCurrentPassword = () => {
        setIsCurrentPassword(!isCurrentPassword);
    };

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
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{t("form.currentPassword")}</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={isCurrentPassword ? "text" : "password"}
                                                placeholder={t("form.placeholder.password")}
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={toggleCurrentPassword}
                                                aria-label={
                                                    isCurrentPassword
                                                        ? "Hide password"
                                                        : "Show password"
                                                }
                                            >
                                                {isCurrentPassword ? (
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
                            name="newPassword"
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
                    <DialogFooter>
                        <Button variant="outline" type="button" onClick={onCancel}>
                            {t("common.cancel")}
                        </Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="animate-spin h-5 w-5" />
                            ) : (
                                t("common.confirm")
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </form>
        </Form>
    );
};
export default memo(ChangePasswordForm);
