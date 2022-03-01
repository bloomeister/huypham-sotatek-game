import { useCallback, useEffect, useRef } from "react";

export const useMouseClick = (callback: (event: MouseEvent) => void) => {
    const rfCallback = useRef(callback);
    const handleMouseClick = useCallback((event: MouseEvent) => {
        rfCallback.current(event);
    }, []);

    useEffect(() => {
        rfCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        document.addEventListener("click", handleMouseClick);

        return () => {
            document.removeEventListener("click", handleMouseClick);
        };
    }, [handleMouseClick]);
};

export const usePressKey = (keys: string[], callback: (event: KeyboardEvent) => void) => {
    // implement the callback ref pattern
    const rfCallback = useRef(callback);

    // hanle what happens on key press
    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            // check if one of the key is part of the ones we want
            if (keys.some((key) => event.key === key)) {
                event.preventDefault();
                rfCallback.current(event);
            }
        },
        [keys]
    );

    useEffect(() => {
        rfCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [handleKeyPress]);
};