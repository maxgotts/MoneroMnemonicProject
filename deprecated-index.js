const Monero = require('monerojs');
const sha1 = require('js-sha1');

console.log("anything")

const connectionVariables = { autoconnect: true }
var daemonRPC = new Monero.daemonRPC(connectionVariables)
.then((daemon) => {
	console.log("func called init")
	daemonRPC = daemon; // Store daemon interface in global variable

	createAndOpenWallet(new Monero.walletRPC() // Connect with defaults
		.then(wallet => {
			walletRPC = wallet;
		})
	);
})
.catch(err => {
	throw new Error(err);
});

function createAndOpenWallet(This) {
	console.log("func called createOpen")
	const walletName = "wallet-"+(sha1("extreme-panda-water-bottles" + new Date().getTime())).slice(0,6)
	return openWallet(This.create_wallet(walletName, '')
		.then(new_wallet => {
			console.log("wallet created \"" + walletName + ".key\" success")
		})
		.catch(err => {
			console.error(err);
		}),
		walletName
	);
}

function openWallet(This, walletName) {
	console.log("func called open")
	return This.open_wallet(walletName, '')
		.then(wallet => {
			wallet.mnemonic()
			.then(words => {
				console.log("wallet opened \"" + walletName + ".key\" success");
				console.log(words)
			})
			.catch(err => {
				console.error(err);
			});
		})
		.catch(err => {
			console.error(err);
		});
}
