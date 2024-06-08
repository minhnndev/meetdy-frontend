import { useEffect, useRef } from "react";

const useWindowUnloadEffect = (handler, callOnCleanup) => {
  const cbRef = useRef<any>();
  cbRef.current = handler;

  useEffect(() => {
    const handler = () => cbRef.current();
    window.addEventListener("beforeunload", handler);

    return () => {
      if (callOnCleanup) handler();
      window.removeEventListener("beforeunload", handler);
    };
  }, [cbRef, callOnCleanup]);
};

export default useWindowUnloadEffect;
