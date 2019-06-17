const Monero = require('monerojs');
var fs = require('fs');

const TheWalletName = "new-wallet"
const mnemonicHint = "turtle"

var daemonRPC = new Monero.daemonRPC({ autoconnect: true })
	.then((daemon) => {
		daemonRPC = daemon; // Store daemon interface in global variable

		var walletRPC = new Monero.walletRPC() // Connect with defaults
		.then(wallet => {
			walletRPC = wallet;
			createMnemonic(walletRPC, mnemonicHint)
		});
	})
	.catch(err => {
		throw new Error(err);
	});

function createWallet(walletRPC, walletName, chain) {
	walletRPC.create_wallet(walletName, '')
		.then(new_wallet => {
			console.log("createWallet " + walletName + ".key success");
			chain(walletRPC, walletName)
		})
		.catch(err => {
			console.error(err);
		});
}

function openWallet(walletRPC, walletName, chain) {
	walletRPC.open_wallet(walletName, '')
	.then(wallet => {
		console.log("openWallet " + walletName + ".key success");
		chain(walletRPC)
	})
}

function createAndOpenWallet2(walletRPC, walletName, chain) {
	createWallet(walletRPC, walletName, function(walletRPC) {
		openWallet(walletRPC, walletName, chain)
	});
}

function createAndOpenWallet(walletRPC, walletName, chain) {
	walletRPC.create_wallet(walletName, '')
		.then(new_wallet => {
			walletRPC.open_wallet(walletName, '')
			.then(wallet => {
				console.log("createAndOpenWallet " + walletName + ".key success");
				chain(walletRPC)
			})
			.catch(err => {
				console.error(err);
			});
		})
		.catch(err => {
			console.error(err);
		});
}

function getMnemonic(walletRPC, keyIncludes, chain) {
	walletRPC.mnemonic()
		.then(mnemonic => {
			console.log("Your mnemonic is: "+mnemonic.key)
			chain(walletRPC, { keyIncluded: mnemonic.key.includes(keyIncludes), mnemonic:mnemonic.key })
		})
		.catch(err => {
			console.error(err);
		});
}

function createMnemonic(walletRPC, keyIncludes) {
	createAndOpenWallet2(walletRPC, TheWalletName, function(walletRPC) {
		getMnemonic(walletRPC, keyIncludes, function(walletRPC, mnemonicOutput) {
			if (mnemonicOutput.keyIncluded) { return mnemonic; }
			else {
				fs.unlink("./wallets/"+TheWalletName+".keys", function() { // delete previous new-wallet.key
					fs.unlink("./wallets/"+TheWalletName, function() { // delete previous new-wallet
						createMnemonic(walletRPC, keyIncludes);
					});
				});
			}
		});
	});
	
}

