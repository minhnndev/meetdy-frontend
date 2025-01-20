import { Locale } from "@/i18n";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// common
import commonEn from "@/i18n/lang/common.en";
import commonVi from "@/i18n/lang/common.vi";
// app
import appEn from "@/i18n/lang/app.en";
import appVi from "@/i18n/lang/app.vi";
// form
import formEn from "@/i18n/lang/form.en";
import formVi from "@/i18n/lang/form.vi";
// error
import errorEn from "@/i18n/lang/error.en";
import errorVi from "@/i18n/lang/error.vi";
// success
import successEn from "@/i18n/lang/success.en";
import successVi from "@/i18n/lang/success.vi";
import Cookies from "js-cookie";

const resources = {
    en: {
        translation: {
            common: commonEn,
            app: appEn,
            form: formEn,
            error: errorEn,
            success: successEn,
        },
    },
    vi: {
        translation: {
            common: commonVi,
            app: appVi,
            form: formVi,
            error: errorVi,
            success: successVi,
        },
    },
};

i18n.use(initReactI18next).init({
    lng: Cookies.get("locale") || "en",
    fallbackLng: "en",
    resources,
    interpolation: { escapeValue: false },
});

export const changeLanguage = (lan: Locale) => {
    i18n.changeLanguage(lan);
};

export default i18n;
