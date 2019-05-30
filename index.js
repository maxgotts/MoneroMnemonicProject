const Monero = require('monerojs');
const sha1 = require('js-sha1');

var daemonRPC = new Monero.daemonRPC({ autoconnect: true })
.then((daemon) => {
	daemonRPC = daemon; // Store daemon interface in global variable

	var walletRPC = new Monero.walletRPC() // Connect with defaults
	.then(wallet => {
		walletRPC = wallet;
		
	});
})
.catch(err => {
	throw new Error(err);
});


function createAndOpenWallet() {
	const walletName = sha1(new Date().getTime())
	return walletRPC.create_wallet(walletName, '')
		.then(new_wallet => {
			walletRPC.open_wallet(walletName, '')
			.then(wallet => {
				walletRPC.getaddress()
				.then(balance => {
					console.log(balance);
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