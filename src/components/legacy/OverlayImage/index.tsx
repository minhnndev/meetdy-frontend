import React from "react";
import "./style.css";

function OverlayImage({ children }: { children: React.ReactNode }) {
    return <div className="overlay-item">{children}</div>;
}

export default OverlayImage;
