import { updateProfileSchema } from "@/utils/validateUtils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getLocaleOnClient } from "@/i18n/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { enUS, vi } from "date-fns/locale";

export type UpdateProfileValuesProps = {
    name: string;
    dob: string;
    gender: "0" | "1";
};

export interface UpdateProfileFormProps {
    userProfile: UpdateProfileValuesProps;
    onSubmit: (values: UpdateProfileValuesProps) => void;
}

const UpdateProfileForm = ({ userProfile, onSubmit }: UpdateProfileFormProps) => {
    const { t } = useTranslation();
    const locale = getLocaleOnClient();

    const [currentYear, setCurrentYear] = useState(
        userProfile.dob ? new Date(userProfile.dob).getFullYear() : new Date().getFullYear()
    );
    const [currentMonth, setCurrentMonth] = useState(
        userProfile.dob ? new Date(userProfile.dob).getMonth() : new Date().getMonth()
    );

    const form = useForm<UpdateProfileValuesProps>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: userProfile.name,
            dob: userProfile.dob,
            gender: userProfile.gender,
        },
    });

    const { handleSubmit } = form;

    useEffect(() => {
        if (userProfile.dob) {
            const dobDate = new Date(userProfile.dob);
            setCurrentYear(dobDate.getFullYear());
            setCurrentMonth(dobDate.getMonth());
        }
    }, [userProfile.dob]);

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} id="update-profile-form" className="space-y-6">
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

                <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => {
                        const selectedDate = field.value ? new Date(field.value) : undefined;

                        const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                            setCurrentYear(Number(e.target.value));
                        };

                        const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
                            setCurrentMonth(Number(e.target.value));
                        };

                        return (
                            <FormItem className="flex flex-col">
                                <FormLabel>{t("form.dob")}</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(new Date(field.value), "dd/MM/yyyy")
                                                ) : (
                                                    <span>{t("form.placeholder.dob")}</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <div className="flex items-center gap-2 px-4 py-2">
                                            <select
                                                value={currentYear}
                                                onChange={handleYearChange}
                                                className="border rounded p-1 flex-1"
                                            >
                                                {Array.from(
                                                    { length: 150 },
                                                    (_, i) => new Date().getFullYear() - i
                                                ).map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                value={currentMonth}
                                                onChange={handleMonthChange}
                                                className="border rounded p-1"
                                            >
                                                {Array.from({ length: 12 }, (_, i) => i).map(
                                                    (month) => (
                                                        <option key={month} value={month}>
                                                            {new Date(0, month).toLocaleString(
                                                                locale,
                                                                { month: "long" }
                                                            )}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <Calendar
                                            mode="single"
                                            selected={selectedDate}
                                            onSelect={(date) => {
                                                if (date) {
                                                    field.onChange(
                                                        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                                                    );
                                                }
                                            }}
                                            month={new Date(currentYear, currentMonth)}
                                            onMonthChange={(date) => {
                                                setCurrentYear(date.getFullYear());
                                                setCurrentMonth(date.getMonth());
                                            }}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                            locale={locale === "vi" ? vi : enUS}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormLabel>{t("form.gender")}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    className="flex gap-4"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="1" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("common.female")}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="0" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("common.male")}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default memo(UpdateProfileForm);
