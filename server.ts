import * as handlers from "./handlers";
import { DataBase } from "./db";

export const db: DataBase = new DataBase();

export const createServer = () => {
    const express = require("express");
    const app = express();

    app.use(express.json());

    app.get("/test/", handlers.asyncTestHandler);

    app.get("/wallets/*", handlers.getBalanceRequestHandler);

    app.post("/wallets/*/credit", handlers.postCreditRequestHandler);

    app.post("/wallets/*/debit", handlers.postDebitRequestHandler);

    app.all("*", handlers.notFoundRequestHandler);

    app.listen(8080, () => {
        console.log("Server is runnnig on 8080...");
    });
};
