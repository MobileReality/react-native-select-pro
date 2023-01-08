export const searchNormalize = (regex: RegExp, label: string) => {
    const lowerCaseLabel = label.toLowerCase();
    const normalizedLabel = lowerCaseLabel.normalize('NFD').replace(/[\u0300-\u036F]/g, '');
    return regex.test(lowerCaseLabel) || regex.test(normalizedLabel);
};
