const express = require("express");
const router = express.Router();
const verification = require("../middleware/authMiddleware")
const checkRole = require('../middleware/roleMiddleware');
const { createStudentController,
    createStaffController,
    createTeacherController,
    getSubjectsController,
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


router.post('/students', verification, checkRole('admin'), createStudentController);//checked
router.post('/staff', verification, checkRole('admin'), createStaffController);//checked
router.post('/teacher', verification, checkRole('admin'), createTeacherController);//checked

//checked
router.get('/dashboard', verification, checkRole('admin'), getStatisticController);
router.get('/users', verification, checkRole('admin'), getUsersController);
router.get('/user/:id', verification, checkRole('admin'), getUserController);
router.put('/updateUser/:id', verification, checkRole('admin'), updateUserController);
router.put('/updateUser/:id/status', verification, checkRole('admin'), updateStatusController);

// made CRUD operations for the classes    checked
router.get('/classes', verification, checkRole('admin'), getClassesController);
router.post('/createClass', verification, checkRole('admin'), createClassesController);
router.put('/class/:id', verification, checkRole('admin'), updateClassesController);
router.delete('/class/:id', verification, checkRole('admin'), deleteClassController);

// make CRUD operations for the teaching_assignments checked
router.get('/teacher_assignments', verification, checkRole('admin'), getTeacherAssignmentsController);
router.post('/teacher_assignments', verification, checkRole('admin'), createTeacherAssignmentController);
router.put('/teacher_assignments/:id', verification, checkRole('admin'), updateTeacherAssignmentController);
router.delete('/teacher_assignments/:id', verification, checkRole('admin'), deleteTeacherAssignmentController);

//make CRUD operations for the subjects checked
router.get('/subjects', verification, checkRole('admin'), getSubjectsController);
router.post('/subjects', verification, checkRole('admin'), createSubjectsController);
router.put('/subjects/:id', verification, checkRole('admin'), updateSubjectsController);
router.delete('/subjects/:id', verification, checkRole('admin'), deleteSubjectController);

module.exports = router;