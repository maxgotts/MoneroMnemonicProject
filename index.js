const Monero = require('monerojs');
const sha1 = require('js-sha1');

var daemonRPC = new Monero.daemonRPC({ autoconnect: true })
.then((daemon) => {
	daemonRPC = daemon; // Store daemon interface in global variable

	var walletRPC = new Monero.walletRPC() // Connect with defaults
	.then(wallet => {
		walletRPC = wallet;
		createAndOpenWallet(walletRPC);
	});
})
.catch(err => {
	throw new Error(err);
});

function createAndOpenWallet(walletRPC) {
	const walletName = "wallet-"+(sha1("extreme-panda-water-bottles" + new Date().getTime())).slice(0,6)
	return walletRPC.create_wallet(walletName, '')
		.then(new_wallet => {
			console.log("wallet created \"" + walletName + ".key\" success")
			openWallet(walletRPC, walletName)
		})
		.catch(err => {
			console.error(err);
		});
}

function openWallet(walletRPC, walletName) {
	return walletRPC.open_wallet(walletName, '')
		.then(wallet => {
			walletRPC.getaddress()
			.then(balance => {
				console.log("wallet opened \"" + walletName + ".key\" success");
			})
			.catch(err => {
				console.error(err);
			});
		})
		.catch(err => {
			console.error(err);
		});
}
