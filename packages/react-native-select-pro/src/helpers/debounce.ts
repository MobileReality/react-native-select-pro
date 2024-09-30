export const debounce = (func: (...args: never[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;

    const debouncedFunction = (...args: never[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };

    debouncedFunction.cancel = () => {
        clearTimeout(timeoutId);
    };

    return debouncedFunction;
};
