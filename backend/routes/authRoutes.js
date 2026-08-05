const express = require("express");
const router = express.Router();
const {
    createStudentController,
   // loginController,
   // adminLoginController
} = require("../controllers/authController");

//const authMiddleware = require("../middleware/authMiddleware");


router.post('/admin/students',createStudentController)

module.exports = router;