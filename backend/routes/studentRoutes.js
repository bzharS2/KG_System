const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware");
const checkRole = require('../middleware/roleMiddleware');
const { getSpecificEvaluationController, getEvaluationController, getSubjectsController, getDashboardController } = require('../controllers/studentController');

router.get('/dashboard', verification, checkRole('student'), getDashboardController);
router.get('/subjects', verification, checkRole('student'), getSubjectsController);
router.get('/evaluations', verification, checkRole('student'), getEvaluationController);
router.get('/evaluations/id', verification, checkRole('student'), getSpecificEvaluationController);

module.exports = router