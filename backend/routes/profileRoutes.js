const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware")
const studentProfileController = require('../controllers/profileController')


router.get('/student', verification, studentProfileController);