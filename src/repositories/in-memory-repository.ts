import { Wallet } from "../domain/wallet";

type example = {
    id: number;
};

export class DataBase {
    db: Map<string, Wallet>;

    constructor() {
        this.db = new Map<string, Wallet>();
    }

    addEntry = (id: string, wallet: Wallet): Promise<Wallet> => {
        this.db.set(id, wallet);

        // FOr testing
        setTimeout(() => console.log("Database ADD call"), 2000);

        return Promise.resolve(wallet);
    };

    getEntry = (id: string): Promise<Wallet | null> => {
        const walletResponse = this.db.get(id);
        const wallet = walletResponse ? walletResponse! : null;

        // For testing
        setTimeout(() => console.log("Database GET call"), 2000);

        return Promise.resolve(wallet);
    };

    isInDb = (id: string): Boolean => {
        return this.db.has(id);
    };
}
