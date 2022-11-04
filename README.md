# Wallet-Web-Server

    When the server is created, the connection to the PostgreSQL database is established and a Pool is created that will be used for communication with the database.

    The routing is done in server.ts, where the handlers are called.

    Every (request) handler parses the arguments from the request body and calls for a specific functionality from the domain that returns a WalletResponse. The response is completed using a HTTPResponse Factory-like tool for trasforming WalletResponse into HTTPResponse.

    The domain sends querries to the database and returns a promise of a wallet. There are 2 types of repositories implemented: in-memory and using PostgreSQL. For the web server I used only the Postgre s repository.

<!-- TODO: INTEGRATE DOCKER -->

Test results:

VGW LND-Web-API

→ Get Empty Wallet Balance
GET http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914 [404 Not Found, 257B, 278ms]
√ Status code is 404-Not Found

→ Credit Wallet with initial balance
POST http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914/credit [201 Created, 235B, 28ms]
√ Status code is 201-Created

→ Get Wallet Balance after initial credit
GET http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914 [200 OK, 285B, 22ms]
√ Status code is 200-Ok
√ Payload as expected

→ Duplicate Credit
POST http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914/credit [202 Accepted, 236B, 11ms]
√ Status code is 202-Accepted

→ Debit Wallet with more than balance
POST http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914/debit [400 Bad Request, 281B, 6ms]
√ Status code is 400-Client Error

→ Debit Wallet with less than balance
POST http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914/debit [201 Created, 234B, 13ms]
√ Status code is 201-Created

→ Duplicate Debit
POST http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914/debit [202 Accepted, 235B, 9ms]
√ Status code is 202-Accepted

→ Get Wallet Balance
GET http://localhost:8080/wallets/d159ee85-c298-4567-bd46-c2286787a914 [200 OK, 284B, 10ms]
√ Status code is 200-Ok
√ Payload as expected

┌─────────────────────────┬───────────────────┬──────────────────┐
│ │ executed │ failed │
├─────────────────────────┼───────────────────┼──────────────────┤
│ iterations │ 1 │ 0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│ requests │ 8 │ 0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│ test-scripts │ 8 │ 0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│ prerequest-scripts │ 1 │ 0 │
├─────────────────────────┼───────────────────┼──────────────────┤
│ assertions │ 10 │ 0 │
├─────────────────────────┴───────────────────┴──────────────────┤
│ total run duration: 1180ms │
├────────────────────────────────────────────────────────────────┤
│ total data received: 179B (approx) │
├────────────────────────────────────────────────────────────────┤
│ average response time: 47ms [min: 6ms, max: 278ms, s.d.: 87ms] │
└────────────────────────────────────────────────────────────────┘
