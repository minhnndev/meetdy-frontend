import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axiosHttp from "@/api/instance/httpMethod";
import { COMMON_GOOGLE_CAPTCHA } from "@/constants/auth.constant";
import { Loader2 } from "lucide-react";

interface ICapchaInputProps {
    onChange: () => void;
}

const CapchaInput = ({ onChange }: ICapchaInputProps) => {
    const [keyGoogleCaptcha, setKeyGoogleCaptcha] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?hl=vi";
        script.async = true;
        script.defer = true;

        script.onload = () => {
            window.grecaptcha.ready(() => setIsScriptLoaded(true));
        };

        script.onerror = () => setError("Failed to load Google reCAPTCHA script.");

        document.body.appendChild(script);
        axiosHttp.get(COMMON_GOOGLE_CAPTCHA)
            .then((res: any) => setKeyGoogleCaptcha(res.KEY_GOOGLE_CAPTCHA))
            .catch(() => setError("Failed to fetch Google reCAPTCHA key."));
    }, []);

    if (error) {
        return <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>;
    }

    return keyGoogleCaptcha && isScriptLoaded ? (
        <div className="flex justify-center my-2">
            <ReCAPTCHA sitekey={keyGoogleCaptcha} onChange={onChange} />
        </div>
    ) : (
        <Loader2 className="animate-spin mx-auto" />
    );
};

export default CapchaInput;
