# Mnemonic Generator for Monero
This creates a mnemonic based on a specific phrase by generating random wallets

Run the following commands in three different terminal windows
./monerod 
./monero-wallet-rpc --rpc-bind-port 28083 --disable-rpc-login --wallet-dir ../wallets
node index.js

Download MyMonero and "open an existing wallet by mnemonic" to check that your new mnemonic works.
