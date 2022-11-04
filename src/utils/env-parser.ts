export const fromEnvtoString = (envArg: string | undefined): string => {
    if (envArg == undefined) {
        throw new Error("Argument not provided");
    }

    return envArg;
};

export const fromEnvtoNumber = (envArg: string | undefined): number => {
    if (envArg == undefined) {
        throw new Error("Argument not provided");
    }

    return Number(envArg);
};
