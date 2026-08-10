const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware");
const {getSpecificEvaluationController,getEvaluationController,getSubjectsController,getDashboardController}= require('../controllers/studentController');

router.get('/dashboard',verification,getDashboardController);
router.get('/subjects',verification,getSubjectsController);
router.get('/evaluations',verification,getEvaluationController);
router.get('/evaluations/id',verification,getSpecificEvaluationController);

module.exports=router