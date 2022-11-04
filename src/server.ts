import * as handlers from "./handlers";
import { DataBase } from "./repositories/in-memory-repository";
import { PostgresRepository } from "./repositories/postgres-repository";
import { createDbPool } from "./config/db-config";

export const db: DataBase = new DataBase();

export const createServer = () => {
    require("dotenv").config();
    const dbPool = createDbPool();
    const walletRepository = new PostgresRepository(dbPool);

    const express = require("express");

    const app = express();

    app.use(express.json());

    app.get("/wallets/*", handlers.getBalanceRequestHandler(walletRepository));

    app.post(
        "/wallets/*/credit",
        handlers.postCreditRequestHandler(walletRepository)
    );

    app.post(
        "/wallets/*/debit",
        handlers.postDebitRequestHandler(walletRepository)
    );

    app.all("*", handlers.notFoundRequestHandler);

    app.listen(8080, () => {
        console.log("Server is runnnig on 8080...");
    });
};
