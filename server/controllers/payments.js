const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.processPayment = async (req, res, next) => {
	try {
		const paymentIntent = await stripe.paymentIntents.create({
			amount: req.body.amount * 100,
			currency: "usd",
			metadata: {integration_check: "accept_a_payment"},
		})

		if (!paymentIntent) {
			res.status(400).json({
				success: false,
				msg: "Unable to process payment",
			})
		}
		res.status(200).json({
			success: true,
			msg: "Payment Successfully",
			clientSecret: paymentIntent.client_secret,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			msg: error.message,
		})
	}
}

exports.sendStripeAPi = async (req, res, next) => {
	try {
		res.status(200).json({
			success: true,
			stripeApiKey: process.env.STRIPE_API_KEY,
		})
	} catch (error) {
		res.status(400).json({
			success: false,
			msg: "Internal Server Error",
		})
	}
}
