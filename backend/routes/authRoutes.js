const express = require("express");
const router = express.Router();
const {
    createStudentController,
    createStaffController,
    createTeacherController,
    loginController
} = require("../controllers/authController");

//const authMiddleware = require("../middleware/authMiddleware");


router.post('/students', createStudentController);
router.post('/staff', createStaffController);
router.post('/teacher', createTeacherController);
router.post('/login', loginController)

module.exports = router;