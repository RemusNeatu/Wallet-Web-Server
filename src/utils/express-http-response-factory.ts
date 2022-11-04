import { Response } from "express";
import { Constants } from "./constants";
import { Command, WalletResponse } from "./types";

export class ExpressResponseFactory {
    // Singleton design pattern
    private static instance: ExpressResponseFactory;

    constructor() {}

    static getInstance(): ExpressResponseFactory {
        if (!ExpressResponseFactory.instance) {
            ExpressResponseFactory.instance = new ExpressResponseFactory();
        }

        return ExpressResponseFactory.instance;
    }

    completeResponse = (
        command: Command,
        response: Response,
        walletResponse: WalletResponse
    ) => {
        response.status(walletResponse.status);

        switch (command) {
            case Command.BALANCE:
                if (walletResponse.status == Constants.HTTP_OK) {
                    // Valid request for a wallet balance.
                    response.json({
                        transactionId: walletResponse.wallet?.transaction_id,
                        version: walletResponse.wallet?.version,
                        coins: walletResponse.wallet?.coins,
                    });
                } else {
                    // Invalid request for a wallet balance.
                    response.send("Not a valid wallet id.");
                }
                break;
            case Command.CREDIT:
                // Valid credit request.
                response.send(walletResponse.wallet?.coins.toString());
                break;
            case Command.DEBIT:
                if (walletResponse.status == Constants.HTTP_NOT_FOUND) {
                    // Invalid debit request. Wrong wallet id.
                    response.send("Not a valid wallet id.");
                } else if (
                    walletResponse.status == Constants.HTTP_BAD_REQUEST
                ) {
                    // Invalid debit request. Debit than more then the balance.
                    response.send(
                        "Bad Request. Not enough money in the wallet."
                    );
                } else {
                    // Valid debit request.
                    response.send(walletResponse.wallet?.coins.toString());
                }
                break;
            default:
                break;
        }
    };
}
