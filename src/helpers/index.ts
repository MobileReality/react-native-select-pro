export type OptionalToRequired<T> = {
    [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
        ? T[P]
        : T[P] | undefined;
};
