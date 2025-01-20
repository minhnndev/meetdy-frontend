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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAppSelector } from "@/redux/store";
import { enterUsernameSchema } from "@/utils/validateUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleHelp, Loader2 } from "lucide-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type EnterUsernameValuesProps = {
    username: string;
};

export interface EnterUsernameFormProps {
    onSubmit: (values: EnterUsernameValuesProps) => void;
}

const EnterUsernameForm = ({ onSubmit }: EnterUsernameFormProps) => {
    const { isLoading } = useAppSelector((state) => state.account);
    const { t } = useTranslation();

    const form = useForm<EnterUsernameValuesProps>({
        resolver: zodResolver(enterUsernameSchema),
        defaultValues: {
            username: "",
        },
    });

    const { handleSubmit } = form;

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
                                    <FormLabel>
                                        <div className="flex items-center gap-2">
                                            {t("common.account")}
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CircleHelp
                                                        fill="grey"
                                                        className="w-4 h-4 text-accent"
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-gray-500 text-white">
                                                    <p>{t("common.OPTWillSend")}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </FormLabel>
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

export default memo(EnterUsernameForm);
