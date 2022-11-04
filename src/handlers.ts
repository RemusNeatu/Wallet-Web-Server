import { Request, Response } from "express";
import { balanceCommand, creditCommand, debitCommand } from "./domain/commands";
import { ExpressResponseFactory } from "./utils/express-http-response-factory";

import { Command, WalletResponse } from "./utils/types";
import { Constants } from "./utils/constants";
import { PostgresRepository } from "./repositories/postgres-repository";

export const getBalanceRequestHandler = (
    walletRepository: PostgresRepository
) => {
    return async (request: Request, response: Response) => {
        const walletId = request.params["0"];
        const walletResponse: WalletResponse = await balanceCommand(
            walletId,
            walletRepository
        );

        ExpressResponseFactory.getInstance().completeResponse(
            Command.BALANCE,
            response,
            walletResponse
        );
    };
};

export const postCreditRequestHandler = (
    walletRepository: PostgresRepository
) => {
    return async (request: Request, response: Response) => {
        const walletId = request.params["0"];
        const transactionId: string = request.body.transactionId;
        const coins: number = request.body.coins;

        const walletResponse: WalletResponse = await creditCommand(
            walletId,
            transactionId,
            coins,
            walletRepository
        );

        ExpressResponseFactory.getInstance().completeResponse(
            Command.CREDIT,
            response,
            walletResponse
        );
    };
};

export const postDebitRequestHandler = (
    walletRepository: PostgresRepository
) => {
    return async (request: Request, response: Response) => {
        const walletId = request.params["0"];
        const transactionId: string = request.body.transactionId;
        const coins: number = request.body.coins;

        const walletResponse: WalletResponse = await debitCommand(
            walletId,
            transactionId,
            coins,
            walletRepository
        );

        ExpressResponseFactory.getInstance().completeResponse(
            Command.DEBIT,
            response,
            walletResponse
        );
    };
};

export const notFoundRequestHandler = (
    request: Request,
    response: Response
) => {
    response.status(Constants.HTTP_NOT_FOUND).send("Resource not found");
};
