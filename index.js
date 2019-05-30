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


/*

Functions to add:

-> createAccount @param <{username<string>, password<string>, credit_card...<{number<string>, expiration<string>}>}> @return response<error>
==> create Monero address
==> create instance in database
==> store user information

-> sendTo @param username<string> @return response<error>
==> (option A) send money to my account
==> (option A) convert money to Monero
==> (option A) move Monero to their account
==> (option B) convert money to Monero
==> add Monero transaction
==> reverse (A/B) on the recipient's side

-> viewTransactions @param username<string> @return [{recipient<string>, date_time<string>, amount<string>}]
==> get transactions
==> convert recipient Monero addresses to usernames
==> convert date_time to location

*/