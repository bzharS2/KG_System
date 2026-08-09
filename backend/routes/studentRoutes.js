const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware");
const getDashboardController= require('../controllers/studentController');

router.get('/dashboard',verification,getDashboardController);
module.exports=router