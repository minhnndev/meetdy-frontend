import { i18n, Locale } from "@/i18n";
import Cookies from "js-cookie";

export const getLocaleOnServer = (): Locale => {
    const LOCALE_COOKIE_NAME = "locale";
    const cookieLocale = Cookies.get(LOCALE_COOKIE_NAME) as Locale;
    return cookieLocale || i18n.defaultLocale;
};
