import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { i18n, Locale } from "@/i18n";
import { getLocaleOnClient, setLocaleOnClient } from "@/i18n/client";
import { Languages } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SelectLanguage = () => {
    const { t } = useTranslation();
    const [language, setLanguage] = useState<Locale>(i18n.defaultLocale);

    useEffect(() => {
        const currentLocale = getLocaleOnClient();
        setLanguage(currentLocale);
    }, []);

    const handleLanguageChange = (lang: Locale) => {
        setLanguage(lang);
        setLocaleOnClient(lang, true);
    };

    return (
        <div className="flex items-center space-x-2">
            <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[150px]">
                    <Languages className="w-5 h-5" />
                    <SelectValue placeholder={t("common.selectLanguage")} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en">{t("common.en")}</SelectItem>
                    <SelectItem value="vi">{t("common.vi")}</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default memo(SelectLanguage);
