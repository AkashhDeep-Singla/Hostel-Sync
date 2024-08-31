const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
// const userValidation = require("../middlewares/userValidate");
// const userLogin = require("../middlewares/userLogin");

router.post("/signup", userController.register);
router.post("/login", userController.login);
// forgot password api

// delete user
router.post("/delete-user/:_id", userController.deleteUser);
// update info of user
router.post("/update-user/:_id", userController.updateUser);

module.exports = router;