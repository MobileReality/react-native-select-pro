export const parsePercentageToNumber = (phrase: string) => {
    if (phrase.length >= 2 && phrase.endsWith('%')) {
        const numValue = Number(phrase.slice(0, -1));
        if (numValue) {
            return numValue;
        }
    }

    return 0;
};
