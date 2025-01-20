import { useFetchCaptcha } from "@/hooks/captcha/useFetchCaptcha";
import { Loader2 } from "lucide-react";
import { memo } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ICapchaInputProps {
    onChange?: (token: string | null) => void;
}

const CaptchaInput = ({ onChange }: ICapchaInputProps) => {
    const { captcha, error, isFetched } = useFetchCaptcha();

    if (error) {
        return <div style={{ color: "red", marginTop: "0.5rem" }}>{error.message}</div>;
    }

    return (
        <div className="flex justify-center">
            {isFetched && captcha?.ENABLE_GOOGLE_CAPTCHA ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <ReCAPTCHA sitekey={captcha.KEY_GOOGLE_CAPTCHA} onChange={onChange} />
            ) : (
                <Loader2 className="animate-spin" />
            )}
        </div>
    );
};

export default memo(CaptchaInput);
