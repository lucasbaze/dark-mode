import { useLocalStorage } from './useLocalStorage';
import { useEffect } from 'react';

export const useDarkMode = () => {
    const [darkModeEnabled, setDarkModeEnabled] = useLocalStorage(
        'dark-mode-enabled',
        false
    );

    useEffect(() => {
        const className = 'dark-mode';
        const body = window.document.body;
        if (darkModeEnabled) {
            body.classList.add(className);
        } else {
            body.classList.remove(className);
        }
    }, [darkModeEnabled]);

    return [darkModeEnabled, setDarkModeEnabled];
};
