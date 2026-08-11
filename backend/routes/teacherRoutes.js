const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware");
const {getTeacherDashboardController,getStudentController,createStudentEvaluation,getTeacherEvaluationsController,updateStudentEvaluations}=require('../controllers/teacherController');

router.get('/dashboard',verification,getTeacherDashboardController);
router.get('/students',verification,getStudentController);
router.get('/evaluations',verification,getTeacherEvaluationsController);

router.post('/evaluations',verification,createStudentEvaluation);
router.put('/evaluations/:id',verification,updateStudentEvaluations);

module.exports=router;