const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const auth = require("../middleware/auth");
const validator = require("../middleware/validator");
// const { userUpdateSchema,  bookSchema,  bookupDateSchema } = require("../models/validationSchema");

router.use(auth);

// router.get("/:userId", verify_user, userController.getProfile);
// router.patch("/:userId", verify_user, validator(userUpdateSchema), userController.updateProfile);
router.get("/", userController.getAllUser);

module.exports = router;