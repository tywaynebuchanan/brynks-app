const express = require("express")
const {getAllRequests,SendRequests,UpdateStatus} = require("../controllers/requests")
const {validateToken} = require("../middleware/validate")
const router = express.Router()

router.post("/get-requests",validateToken,getAllRequests)
router.post("/send-request",validateToken,SendRequests)
router.post("/update-status",validateToken,UpdateStatus)

module.exports = router