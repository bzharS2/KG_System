const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware");
const checkRole = require('../middleware/roleMiddleware');
const { getTeacherDashboardController, getStudentController, createStudentEvaluation, getTeacherEvaluationsController, updateStudentEvaluations } = require('../controllers/teacherController');

router.get('/dashboard', verification, checkRole('teacher'), getTeacherDashboardController);
router.get('/students', verification, checkRole('teacher'), getStudentController);
router.get('/evaluations', verification, checkRole('teacher'), getTeacherEvaluationsController);
router.post('/evaluations', verification, checkRole('teacher'), createStudentEvaluation);
router.put('/evaluations/:id', verification, checkRole('teacher'), updateStudentEvaluations);

module.exports = router;