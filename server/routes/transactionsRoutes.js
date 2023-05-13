const express = require("express")
const router = express.Router()
const {transferTo,verifyUser, getAllTransactions} = require("../controllers/transfers")
const {validateToken} = require("../middleware/validate")


router.use(validateToken)
router.post("/transfer-funds",transferTo)
router.post("/verify-user",verifyUser)
router.post("/transactions-list",validateToken,getAllTransactions)
module.exports = router