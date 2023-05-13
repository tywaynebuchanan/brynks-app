const express = require("express")
const router = express.Router()
const {processPayment, sendStripeAPi} = require("../controllers/payments")
const {validateToken} = require("../middleware/validate")

router.post("/create-payment-intent", processPayment)
router.get("/send-stripe",sendStripeAPi)

module.exports = router
