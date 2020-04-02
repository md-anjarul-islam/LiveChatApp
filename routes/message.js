const express = require("express");
const router = express.Router();
const messageController = require("../controller/message");
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get("/:userId", messageController.getMessage);
router.post("/:userId", messageController.postMessage);

module.exports = router;