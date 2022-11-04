import { fromEnvtoNumber, fromEnvtoString } from "../utils/env-parser";
import { DataBaseConfigParams } from "../utils/types";
import { Pool } from "pg";

const config = (): DataBaseConfigParams => {
    const env = process.env;

    return {
        host: fromEnvtoString(env.host),
        user: fromEnvtoString(env.user),
        password: fromEnvtoString(env.password),
        db: fromEnvtoString(env.db),
        dialect: fromEnvtoString(env.dialect),
        port: fromEnvtoNumber(env.port),
    };
};

export const createDbPool = (): Pool => {
    return new Pool(config());
};
