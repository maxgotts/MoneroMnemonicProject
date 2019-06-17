const Monero = require('monerojs');

var daemonRPC = new Monero.daemonRPC({ autoconnect: true })
.then((daemon) => {
	daemonRPC = daemon; // Store daemon interface in global variable

	var walletRPC = new Monero.walletRPC() // Connect with defaults
	.then(wallet => {
		walletRPC = wallet;
		createAndOpenWallet(walletRPC, getMnemonic);
	});
})
.catch(err => {
	throw new Error(err);
});


function createAndOpenWallet(walletRPC, chain) {
	const walletName = "new-wallet"
	return walletRPC.create_wallet(walletName, '')
		.then(new_wallet => {
			walletRPC.open_wallet(walletName, '')
			.then(wallet => {
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

function getMnemonic(walletRPC, keyIncludes) {
	walletRPC.mnemonic()
		.then(mnemonic => {
			console.log("createAndOpenWallet " + walletName + ".key success");
			console.log("Your mnemonic is: "+mnemonic.key)
			return walletRPC
		})
		.catch(err => {
			console.error(err);
		});
}

