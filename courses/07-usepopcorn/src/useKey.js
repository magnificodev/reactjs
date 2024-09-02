import { useEffect } from "react";

export const useKey = (key, action) => {
    useEffect(() => {
        const handleCallback = (e) => {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                action();
            }
        };

        document.addEventListener("keydown", handleCallback);

        return () => {
            document.removeEventListener("keydown", handleCallback);
        };
    }, [key, action]);
};
