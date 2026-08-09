const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware")
const { updateClassesController, createClassesController, getClassesController, getUserController, getUsersController, getStatisticController, updateUserController, updateStatusController } = require('../controllers/adminController')


router.get('/dashboard', verification, getStatisticController);
router.get('/users', verification, getUsersController);
router.get('/user/:id', verification, getUserController);
router.put('/updateUser/:id', verification, updateUserController);
router.put('/updateUser/:id/status', verification, updateStatusController);
router.get('/classes', verification, getClassesController);
router.post('/createClass', verification, createClassesController);
router.put('/class/:id', verification, updateClassesController)

module.exports = router;