import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifySchema } from "@/utils/validateUtils";
import { useAppSelector } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type VerifyValuesProps = {
    pin: string;
};

export interface VerifyFormProps {
    isCounting: boolean;
    remainingTime: number;
    onSubmit: (values: VerifyValuesProps) => void;
    resendCode?: () => void;
}

const VerifyForm = ({ isCounting, remainingTime, onSubmit, resendCode }: VerifyFormProps) => {
    const { t } = useTranslation();
    const { isLoading } = useAppSelector((state) => state.account);

    const form = useForm<VerifyValuesProps>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            pin: "",
        },
        mode: "onChange",
    });

    const { handleSubmit, formState } = form;
    const { isValid } = formState;

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 justify-center">
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
                    <Button type="submit" className="w-full" disabled={!isValid || isLoading}>
                        {isLoading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            t("common.verify")
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default memo(VerifyForm);
