import { Pool } from "pg";
import { Wallet } from "../domain/wallet";

export class PostgresRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    getWallet = async (walletId: string): Promise<Wallet> => {
        const result = await this.pool.query(
            `SELECT * FROM WALLETS
            WHERE wallet_id = $1
            ORDER BY version DESC`,
            [walletId]
        );

        return result.rowCount > 0 ? result.rows[0] : null;
    };

    addWallet = async (wallet: Wallet): Promise<Wallet> => {
        const result = await this.pool.query(
            `INSERT INTO WALLETS
            (wallet_id, coins, version, transaction_id)
            VALUES ($1, $2, $3, $4)`,
            [
                wallet.wallet_id,
                wallet.coins,
                wallet.version,
                wallet.transaction_id,
            ]
        );

        return await this.getWallet(wallet.wallet_id);
    };
}
