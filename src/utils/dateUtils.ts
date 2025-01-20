import { t } from "i18next";

const DAY_MILISECONDS = 86400000;
const HOURSE_MILISECONDS = 3600000;
const MINUTE_MILISECONDS = 60000;

/**
 * @description: Các hàm xử lý về thời gian
 */
const dateUtils = {
    /**
     *
     * @param dateString - Chuỗi thời gian cần chuyển đổi
     * @returns Chuỗi thời gian đã chuyển đổi
     */
    toTime: (dateString: string): string => {
        const date = new Date(dateString);
        const nowTempt = new Date();

        if (nowTempt.getFullYear() - date.getFullYear() > 0) {
            return t("common.dateFormat", {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            });
        }

        const dateWasMinus7day = nowTempt.setDate(nowTempt.getDate() - 7);

        if (date.getTime() < dateWasMinus7day) {
            return t("common.dateFormat", {
                day: `0${date.getDate()}`.slice(-2),
                month: `0${date.getMonth() + 1}`.slice(-2),
                year: "",
            }).trim();
        }

        const now = new Date();
        const numberMiliseconds = now.getTime() - date.getTime();

        const day = Math.floor(numberMiliseconds / DAY_MILISECONDS);
        if (day > 0) return t("common.timeAgo.day", { value: `0${day}`.slice(-2) });

        const hour = Math.floor(numberMiliseconds / HOURSE_MILISECONDS);
        if (hour > 0) return t("common.timeAgo.hour", { value: `0${hour}`.slice(-2) });

        const minute = Math.floor(numberMiliseconds / MINUTE_MILISECONDS);
        if (minute > 0) return t("common.timeAgo.minute", { value: `0${minute}`.slice(-2) });

        return t("common.timeAgo.second");
    },

    transferDateString: (day: number, month: number, year: number): string => {
        return t("common.dateFormat", {
            day: `0${day}`.slice(-2),
            month: `0${month}`.slice(-2),
            year: `${year}`,
        });
    },

    compareDate: (time: Date, currentTime: Date): boolean => {
        return time.setHours(0, 0, 0, 0) === currentTime.setHours(0, 0, 0, 0);
    },

    checkLeapYear: (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
};

export default dateUtils;
