var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "gp5pqkkbfrcsxtfh",
  publicKey: "hcqprc6dztjw9y7r",
  privateKey: "9bdaa5fb022195724fd08cdf69154ca7"
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err) {
            res.status(500).send(err);
        } else {
            res.send(response);
        }
      });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let amountFromTheClient = req.body.amount;
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err) {
              res.status(500).json(error)
          } else {
              res.json(result);
          }
      });
};