const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware")
const { getUserController, getUsersController, getStatisticController } = require('../controllers/adminController')


router.get('/dashboard', verification, getStatisticController);
router.get('/users', verification, getUsersController)
router.get('/user/:id', verification, getUserController)

module.exports = router;