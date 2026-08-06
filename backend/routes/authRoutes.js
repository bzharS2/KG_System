const express = require("express");
const router = express.Router();
const {
    createStudentController,
    createStaffController,
    createTeacherController,
    loginController
} = require("../controllers/authController");

//const authMiddleware = require("../middleware/authMiddleware");


router.post('/admin/students', createStudentController);
router.post('/admin/staff', createStaffController);
router.post('/admin/teacher', createTeacherController);
router.post('/login', loginController)

module.exports = router;