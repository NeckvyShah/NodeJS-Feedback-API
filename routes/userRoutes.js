const express = require("express");
const router = express.Router();
const { signUp } = require("../controllers/userController");

router.post("/signup", signUp);
// router.get("/", getAllUsers);

module.exports = router;
