export const parsePercentageToNumber = (phrase: string) => {
    if (phrase.includes('%')) {
        const split = phrase.split('%');
        return Number(split[0]);
    }
    return 0;
};
