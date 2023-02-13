// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mergeObjects = (a: Record<string, any>, b?: Record<string, any>) => {
    if (!b) {
        return a;
    }
    const result: Record<string, unknown> = {};
    for (const key in a) {
        if (key in b) {
            if (typeof a[key] === 'object' && typeof b[key] === 'object') {
                result[key] = mergeObjects(a[key], b[key]);
            } else {
                result[key] = b[key];
            }
        } else {
            result[key] = a[key];
        }
    }
    for (const key in b) {
        if (!(key in result)) {
            result[key] = b[key];
        }
    }
    return result;
};
