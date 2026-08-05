const express = require("express");
const router = express.Router();
const {
    createStudentController,
    createStaffController,
   // loginController,
   // adminLoginController
} = require("../controllers/authController");

//const authMiddleware = require("../middleware/authMiddleware");


router.post('/admin/students',createStudentController);
router.post('/admin/staff',createStaffController)

module.exports = router;