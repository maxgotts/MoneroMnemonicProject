const Monero = require('monerojs');

var daemonRPC = new Monero.daemonRPC({ autoconnect: true })
.then((daemon) => {
	daemonRPC = daemon; // Store daemon interface in global variable

	var walletRPC = new Monero.walletRPC() // Connect with defaults
	.then(wallet => {
		walletRPC = wallet;
		walletRPC.create_wallet('monero_test_wallet', '')
		.then(new_wallet => {
			walletRPC.open_wallet('monero_test_wallet', '')
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
	});
})
.catch(err => {
	throw new Error(err);
});
