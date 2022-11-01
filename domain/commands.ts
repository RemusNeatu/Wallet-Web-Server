import { db } from "../server";
import { WalletResponse } from "../utils/types";
import { Wallet } from "./wallet";
import { Constants } from "../utils/constants";

export const balanceCommand = async (
    walletId: string
): Promise<WalletResponse> => {
    const wallet = await db.getEntry(walletId);

    if (wallet) {
        return { status: Constants.HTTP_OK, wallet: wallet };
    } else {
        return { status: Constants.HTTP_NOT_FOUND };
    }
};

export const creditCommand = async (
    walletId: string,
    transactionId: string,
    coins: number
): Promise<WalletResponse> => {
    const wallet = await db.getEntry(walletId);

    if (wallet) {
        const succes = wallet.credit(transactionId, coins);
        if (!succes) {
            return {
                status: Constants.HTTP_ACCEPTED,
                wallet: wallet,
            };
        }

        await db.addEntry(walletId, wallet);
        return { status: Constants.HTTP_CREATED, wallet: wallet };
    } else {
        const newWallet = new Wallet(transactionId, coins);
        await db.addEntry(walletId, newWallet);

        return {
            status: Constants.HTTP_CREATED,
            wallet: newWallet,
        };
    }
};

export const debitCommand = async (
    walletId: string,
    transactionId: string,
    coins: number
): Promise<WalletResponse> => {
    const wallet = await db.getEntry(walletId);

    if (!wallet) {
        return { status: Constants.HTTP_NOT_FOUND };
    }

    if (coins > wallet.getCoins()) {
        return {
            status: Constants.HTTP_BAD_REQUEST,
            wallet: wallet,
        };
    }

    const succes = wallet?.debit(transactionId, coins);
    if (!succes) {
        return {
            status: Constants.HTTP_ACCEPTED,
            wallet: wallet,
        };
    }

    await db.addEntry(walletId, wallet);
    return { status: Constants.HTTP_CREATED, wallet: wallet };
};
