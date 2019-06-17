const Monero = require('monerojs');
var fs = require('fs');

const walletName = "new-wallet"

var daemonRPC = new Monero.daemonRPC({ autoconnect: true })
	.then((daemon) => {
		daemonRPC = daemon; // Store daemon interface in global variable

		var walletRPC = new Monero.walletRPC() // Connect with defaults
		.then(wallet => {
			walletRPC = wallet;
			createMnemonic(walletRPC, "jazz")
		});
	})
	.catch(err => {
		throw new Error(err);
	});

function createWallet(walletRPC)

function createAndOpenWallet(walletRPC, chain) {
	return walletRPC.create_wallet(walletName, '')
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
	createAndOpenWallet(walletRPC, function(walletRPC) {
		getMnemonic(walletRPC, keyIncludes, function(walletRPC, mnemonicOutput) {
			if (mnemonicOutput.keyIncluded) { return menonic; }
			else {
				fs.unlink("./wallets/"+walletName+".keys", function() { // delete previous new-wallet.key
					fs.unlink("./wallets/"+walletName, function() { // delete previous new-wallet
						createMnemonic(walletRPC, keyIncludes);
					});
				});
			}
		});
	});
	
}

