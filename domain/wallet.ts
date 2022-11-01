export class Wallet {
    private transactionId: string;
    private version: number;
    private coins: number;
    private lastCredit: number;
    private lastDebit: number;

    constructor(transactionId: string, coins: number) {
        this.transactionId = transactionId;
        this.version = 1;
        this.coins = coins;
        this.lastCredit = 0;
        this.lastDebit = 0;
    }

    getTransactionId = (): string => {
        return this.transactionId;
    };

    getVersion = (): number => {
        return this.version;
    };

    getCoins = (): number => {
        return this.coins;
    };

    private addCoins = (coinSurplus: number) => {
        this.coins += coinSurplus;
    };

    private extractCoins = (coinDiff: number) => {
        this.coins -= coinDiff;
    };

    credit = (transactionId: string, coins: number): boolean => {
        if (transactionId == this.transactionId) {
            return false;
        }

        this.transactionId = transactionId;
        this.version++;
        this.addCoins(coins);
        this.lastCredit = coins;

        return true;
    };

    debit = (transactionId: string, coins: number): boolean => {
        if (transactionId == this.transactionId) {
            return false;
        }

        this.transactionId = transactionId;
        this.version++;
        this.extractCoins(coins);
        this.lastCredit = coins;

        return true;
    };
}
