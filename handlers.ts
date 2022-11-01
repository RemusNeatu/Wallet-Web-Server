import { Request, Response } from "express";
import { balanceCommand, creditCommand, debitCommand } from "./domain/commands";
import { ExpressResponseFactory } from "./utils/express-http-response-factory";

import { Command, WalletResponse } from "./utils/types";
import { Constants } from "./utils/constants";

export const getBalanceRequestHandler = async (
    request: Request,
    response: Response
) => {
    const walletId = request.params["0"];
    const walletResponse: WalletResponse = await balanceCommand(walletId);

    ExpressResponseFactory.getInstance().completeResponse(
        Command.BALANCE,
        response,
        walletResponse
    );
};

export const postCreditRequestHandler = async (
    request: Request,
    response: Response
) => {
    const walletId = request.params["0"];
    const transactionId: string = request.body.transactionId;
    const coins: number = request.body.coins;

    const walletResponse: WalletResponse = await creditCommand(
        walletId,
        transactionId,
        coins
    );

    ExpressResponseFactory.getInstance().completeResponse(
        Command.CREDIT,
        response,
        walletResponse
    );
};

export const postDebitRequestHandler = async (
    request: Request,
    response: Response
) => {
    const walletId = request.params["0"];
    const transactionId: string = request.body.transactionId;
    const coins: number = request.body.coins;

    const walletResponse: WalletResponse = await debitCommand(
        walletId,
        transactionId,
        coins
    );

    ExpressResponseFactory.getInstance().completeResponse(
        Command.DEBIT,
        response,
        walletResponse
    );
};

export const notFoundRequestHandler = (
    request: Request,
    response: Response
) => {
    response.status(Constants.HTTP_NOT_FOUND).send("Resource not found");
};

// Just for testing
export const asyncTestHandler = async (
    request: Request,
    response: Response
) => {
    await setTimeout(() => console.log("hello world"), 4000);
    response.send("Done");
};
