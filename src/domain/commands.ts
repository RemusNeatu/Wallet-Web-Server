import { db } from "../server";
import { WalletResponse } from "../utils/types";
import { Wallet } from "./wallet";
import { Constants } from "../utils/constants";
import { PostgresRepository } from "../repositories/postgres-repository";

export const balanceCommand = async (
    walletId: string,
    walletRepository: PostgresRepository
): Promise<WalletResponse> => {
    const wallet = await walletRepository.getWallet(walletId);

    if (wallet) {
        return { status: Constants.HTTP_OK, wallet: wallet };
    } else {
        return { status: Constants.HTTP_NOT_FOUND };
    }
};

export const creditCommand = async (
    walletId: string,
    transactionId: string,
    coins: number,
    walletRepository: PostgresRepository
): Promise<WalletResponse> => {
    const wallet = await walletRepository.getWallet(walletId);

    if (wallet) {
        if (transactionId === wallet.transaction_id) {
            return {
                status: Constants.HTTP_ACCEPTED,
                wallet: wallet,
            };
        }

        const newWallet: Wallet = {
            ...wallet,
            wallet_id: walletId,
            transaction_id: transactionId,
            version: wallet.version + 1,
            coins: wallet.coins + coins,
        };

        await walletRepository.addWallet(newWallet);

        return { status: Constants.HTTP_CREATED, wallet: newWallet };
    } else {
        const newWallet = {
            wallet_id: walletId,
            transaction_id: transactionId,
            version: 1,
            coins: coins,
        };

        await walletRepository.addWallet(newWallet);

        return {
            status: Constants.HTTP_CREATED,
            wallet: newWallet,
        };
    }
};

export const debitCommand = async (
    walletId: string,
    transactionId: string,
    coins: number,
    walletRepository: PostgresRepository
): Promise<WalletResponse> => {
    const wallet = await walletRepository.getWallet(walletId);

    if (!wallet) {
        return { status: Constants.HTTP_NOT_FOUND };
    }

    if (transactionId === wallet.transaction_id) {
        return {
            status: Constants.HTTP_ACCEPTED,
            wallet: wallet,
        };
    }

    if (coins > wallet.coins) {
        return {
            status: Constants.HTTP_BAD_REQUEST,
            wallet: wallet,
        };
    }

    const newWallet: Wallet = {
        ...wallet,
        transaction_id: transactionId,
        version: wallet.version + 1,
        coins: wallet.coins - coins,
    };

    await walletRepository.addWallet(newWallet);
    return { status: Constants.HTTP_CREATED, wallet: newWallet };
};
