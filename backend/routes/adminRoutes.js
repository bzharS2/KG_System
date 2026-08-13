const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware")
const { getSubjectsController,
    createSubjectsController,
    updateSubjectsController,
    deleteSubjectController,
    deleteClassController,
    deleteTeacherAssignmentController,
    updateTeacherAssignmentController,
    createTeacherAssignmentController,
    getTeacherAssignmentsController,
    updateClassesController,
    createClassesController,
    getClassesController,
    getUserController,
    getUsersController,
    getStatisticController,
    updateUserController,
    updateStatusController
} = require('../controllers/adminController')


router.get('/dashboard', verification, getStatisticController);
router.get('/users', verification, getUsersController);
router.get('/user/:id', verification, getUserController);
router.put('/updateUser/:id', verification, updateUserController);
router.put('/updateUser/:id/status', verification, updateStatusController);

// made CRUD operations for the classes
router.get('/classes', verification, getClassesController);
router.post('/createClass', verification, createClassesController);
router.put('/class/:id', verification, updateClassesController);
router.delete('class/:id', verification, deleteClassController);

// make CRUD operations for the teaching_assignments
router.get('/teacher_assignments', verification, getTeacherAssignmentsController);
router.post('/teacher_assignments', verification, createTeacherAssignmentController);
router.put('/teacher_assignments/:id', verification, updateTeacherAssignmentController);
router.delete('/teacher_assignments/:id', verification, deleteTeacherAssignmentController);

//make CRUD operations for the subjects
router.get('/subjects', verification, getSubjectsController);
router.post('/subjects',verification,createSubjectsController);
router.put('/subjects/:id', verification, updateTeacherAssignmentController);
router.delete('/subjects/:id', verification, deleteTeacherAssignmentController);

module.exports = router;