var fs = require('fs');

const walletName = "new-wallet"

fs.unlink("./wallets/"+walletName+".keys", function() { // delete previous new-wallet.key
    fs.unlink("./wallets/"+walletName, function() { // delete previous new-wallet.key
        console.log("done")
    });
});