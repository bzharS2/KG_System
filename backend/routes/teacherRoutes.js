const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware");
const {getTeacherDashboardController,getStudentController,createStudentEvaluation}=require('../controllers/teacherController');

router.get('/dashboard',verification,getTeacherDashboardController);
router.get('/students',verification,getStudentController);
router.post('/student/evaluation',verification,createStudentEvaluation);

module.exports=router;