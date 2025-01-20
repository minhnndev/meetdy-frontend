import { i18n, Locale } from "@/i18n";
import { changeLanguage } from "@/i18n/i18next-config";
import Cookies from "js-cookie";

const LOCALE_COOKIE_NAME = "locale";

export const getLocaleOnClient = (): Locale => {
    return (Cookies.get(LOCALE_COOKIE_NAME) as Locale) || i18n.defaultLocale;
};

export const setLocaleOnClient = (locale: Locale, notReload?: boolean) => {
    Cookies.set(LOCALE_COOKIE_NAME, locale);
    changeLanguage(locale);
    if (!notReload) location.reload();
};
