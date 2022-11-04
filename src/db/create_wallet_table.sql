CREATE TABLE WALLETS (
    id             BIGSERIAL NOT NULL PRIMARY KEY,
    wallet_id      TEXT NOT NULL,
    coins          INTEGER NOT NULL,
    version        INTEGER NOT NULL,
    transaction_id TEXT NOT NULL,
    CONSTRAINT unique_transaction_id UNIQUE (transaction_id)
);