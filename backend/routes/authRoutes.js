const express = require("express");
const router = express.Router();
const {
    registerController,
   // loginController,
   // adminLoginController
} = require("../controllers/authController");

//const authMiddleware = require("../middleware/authMiddleware");


router.get('/register',registerController)

module.exports = router;