import { Wallet } from "../domain/wallet";

export type WalletResponse = {
    status: number;
    wallet?: Wallet;
};

export enum Command {
    BALANCE,
    CREDIT,
    DEBIT,
}
