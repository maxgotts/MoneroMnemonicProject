const Monero = require('monerojs');
//const sha1 = require('js-sha1');

var daemonRPC = new Monero.daemonRPC({ autoconnect: true })
.then((daemon) => {
	daemonRPC = daemon; // Store daemon interface in global variable

	var walletRPC = new Monero.walletRPC() // Connect with defaults
	.then(wallet => {
		walletRPC = wallet;
		createAndOpen(walletRPC);	
	});
})
.catch(err => {
	throw new Error(err);
});


function createAndOpenWallet(walletRPC) {
	const walletName = "new_wallet_42" //sha1(new Date().getTime())
	return walletRPC.create_wallet(walletName, '')
		.then(new_wallet => {
			walletRPC.open_wallet(walletName, '')
			.then(wallet => {
				walletRPC.getaddress()
				.then(balance => {
					console.log("createAndOpenWallet success");
				})
				.catch(err => {
					console.error(err);
				});
			})
			.catch(err => {
				console.error(err);
			});
		})
		.catch(err => {
			console.error(err);
		});
}
