/**
 * Extract the first initials from a given string.
 * @param str - The input string, e.g., "Nguyen Van A"
 * @returns {string} - The initials, e.g., "NA"
 */
export const getInitials = (str: string): string => {
    const words = str
        ?.normalize("NFKD")
        ?.replace(/[\u0300-\u036F]/g, "")
        ?.trim()
        ?.split(" ")
        .filter(Boolean);

    if (!words || words.length === 0) return "";

    if (words.length === 1) {
        return words[0]?.[0]?.toUpperCase() || "";
    }

    const firstInitial = words[0]?.[0] || "";
    const lastInitial = words[words.length - 1]?.[0] || "";

    return (firstInitial + lastInitial).toUpperCase();
};
