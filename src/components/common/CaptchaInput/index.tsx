import { memo } from "react";
import { Loader2 } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { useFetchCaptcha } from "@/hooks/captcha/useFetchCaptcha";

interface ICaptchaInputProps {
    onChange?: (token: string | null) => void;
}

const CaptchaInput = ({ onChange }: ICaptchaInputProps) => {
    const { captcha, error, isFetched } = useFetchCaptcha();

    if (error) {
        return <div style={{ color: "red", marginTop: "0.5rem" }}>{error.message}</div>;
    }

    return (
        <div className="flex justify-center">
            {isFetched && captcha?.enableGoogleCaptcha ? (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <ReCAPTCHA sitekey={captcha.siteKeyV2} onChange={onChange} />
            ) : (
                <Loader2 className="animate-spin" />
            )}
        </div>
    );
};

export default memo(CaptchaInput);
