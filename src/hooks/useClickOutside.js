import { useCallback, useEffect } from 'react';

const useClickOutside = (ref, callback) => {
    const handleClick = useCallback((e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    }, [ref, callback]);

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick]);
};

export default useClickOutside;