const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db");
const express = require("express");


const getTeacherDashboardController = async (req, res) => {
try {
        const [result] = await db.query(`
            SELECT 
                teacher.username,
                teacher.email,
                teacher.date_of_birth,
                assignment.id AS assignment_id,
                subjects.name AS subject,
                classes.name AS class
            FROM users AS teacher
            JOIN teaching_assignments AS assignment
                ON assignment.teacher_id = teacher.id
            JOIN subjects
                ON subjects.id = assignment.subject_id
            JOIN classes
                ON classes.id = assignment.class_id
            WHERE teacher.id = ?
              AND teacher.role = 'teacher'
        `, [req.user.id]);

        if (result.length === 0) {
            return res.status(404).json({
                error: "no personal info"
            });
        }

        const teacher = {
            username: result[0].username,
            email: result[0].email,
            date_of_birth: result[0].date_of_birth,
            assignments: result.map(row => ({
                 id: row.assignment_id,
                subject: row.subject,
                class: row.class
            }))
        };

        return res.status(200).json(teacher);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "internal server error"
        });
    }

};
const getStudentController = async (req, res) => {
    try {
        const [result] = await db.query(
            `SELECT DISTINCT
        student.id,
        student.username,
        student.email,
        student.date_of_birth,
        classes.name AS class
     FROM users AS teacher
     JOIN teaching_assignments AS assignment
         ON assignment.teacher_id = teacher.id
     JOIN users AS student
         ON student.class_id = assignment.class_id
     JOIN classes
         ON classes.id = student.class_id
     WHERE teacher.id = ?
       AND teacher.role = 'teacher'
       AND student.role = 'student'`,
            [req.user.id]
        );
        if (result.length == 0) {
            return res.status(400).json({ error: `no students ` })
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error })

    }
};
const createStudentEvaluation = async (req, res) => {
    const { student_id, subject_id, grade, opinion } = req.body;

    if (
        !student_id ||
        !subject_id ||
        grade === undefined ||
        !opinion ||
        opinion.trim() === ""
    ) {
        return res.status(400).json({
            error: "invalid inputs"
        });
    }

    if (
        typeof grade !== "number" ||
        grade < 0 ||
        grade > 100
    ) {
        return res.status(400).json({
            error: "invalid grade value"
        });
    }

    try {
        const [students] = await db.query(
            `SELECT id
             FROM users
             WHERE id = ?
             AND role = 'student'`,
            [student_id]
        );

        if (students.length !== 1) {
            return res.status(404).json({
                error: "user not found"
            });
        }

        const [subjects] = await db.query(
            `SELECT id
             FROM subjects
             WHERE id = ?`,
            [subject_id]
        );

        if (subjects.length !== 1) {
            return res.status(404).json({
                error: "subject not found"
            });
        }

        const [assignment] = await db.query(
            `SELECT assignment.id AS teaching_assignment_id
             FROM teaching_assignments AS assignment
             JOIN users AS student
                 ON student.class_id = assignment.class_id
             WHERE assignment.teacher_id = ?
             AND assignment.subject_id = ?
             AND student.id = ?
             AND student.role = 'student'`,
            [req.user.id, subject_id, student_id]
        );

        if (assignment.length === 0) {
            return res.status(403).json({
                error: "you are not assigned to teach this student for this subject"
            });
        }

        const teachingAssignmentId =
            assignment[0].teaching_assignment_id;

        const [existingEvaluation] = await db.query(
            `SELECT id
             FROM evaluations
             WHERE student_id = ?
             AND teaching_assignment_id = ?`,
            [student_id, teachingAssignmentId]
        );

        if (existingEvaluation.length > 0) {
            return res.status(409).json({
                error: "evaluation already exists for this student"
            });
        }

        const [evaluation] = await db.query(
            `INSERT INTO evaluations
             (student_id, teaching_assignment_id, grade, opinion)
             VALUES (?, ?, ?, ?)`,
            [
                student_id,
                teachingAssignmentId,
                grade,
                opinion.trim()
            ]
        );

        if (evaluation.affectedRows === 0) {
            return res.status(400).json({
                error: "evaluation could not be created"
            });
        }

        return res.status(201).json({
            message: "evaluation added successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "internal server error"
        });
    }
};
const getTeacherEvaluationsController = async (req, res) => {
    try {
        const [result] = await db.query(
            `SELECT
                evaluation.id,
                student.id AS student_id,
                student.username AS student,
                subject.name AS subject,
                subject.id AS subject_id,
                evaluation.grade,
                evaluation.opinion
             FROM evaluations AS evaluation
             JOIN users AS student
                 ON student.id = evaluation.student_id
             JOIN teaching_assignments AS assignment
                 ON assignment.id = evaluation.teaching_assignment_id
             JOIN subjects AS subject
                 ON subject.id = assignment.subject_id
             WHERE assignment.teacher_id = ?`,
            [req.user.id]
        );

        if (result.length === 0) {
            // it will be empty since the teacher hasn't made any evaluations yet
            return res.status(200).json(result);
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "internal server error"
        });
    }
};

const updateStudentEvaluations = async (req, res) => {
    const evaluation_id = req.params.id;
    const { grade, opinion } = req.body;
    if (
        typeof grade !== "number" ||
        grade < 0 ||
        grade > 100
    ) {
        return res.status(400).json({
            error: "invalid grade value"
        });
    } else if (opinion.trim() === "" || !opinion) {
        return res.status(400).json({
            error: "invalid opinion value"
        });
    }

    try {
        const [evaluation] = await db.query(
            `SELECT evaluation.id
             FROM evaluations AS evaluation
             JOIN teaching_assignments AS assignment
                 ON assignment.id = evaluation.teaching_assignment_id
             WHERE evaluation.id = ?
               AND assignment.teacher_id = ?`,
            [evaluation_id, req.user.id]
        );

        if (evaluation.length === 0) {
            return res.status(404).json({
                error: "evaluation not found or you are not authorized to update it"
            });
        }

        const [result] = await db.query(
            `UPDATE evaluations
             SET grade = ?, opinion = ?
             WHERE id = ?`,
            [grade, opinion.trim(), evaluation_id]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({
                error: "evaluation was not updated"
            });
        }

        return res.status(200).json({
            message: "evaluation updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: "internal server error"
        });
    }
};
const getTeacherClassesController = async (req, res) => {
    const teacherId = req.user.id;

    try {
        const [result] = await db.query(`
            SELECT DISTINCT
                class.id,
                class.name
            FROM teaching_assignments AS assignment
            JOIN classes AS class
                ON class.id = assignment.class_id
            WHERE assignment.teacher_id = ?
            ORDER BY class.name ASC
        `, [teacherId]);

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "internal server error"
        });
    }
};

const getTeacherSubjectsController = async (req, res) => {
    const teacherId = req.user.id;

    try {
        const [result] = await db.query(`
            SELECT DISTINCT
                subject.id,
                subject.name
            FROM teaching_assignments AS assignment
            JOIN subjects AS subject
                ON subject.id = assignment.subject_id
            WHERE assignment.teacher_id = ?
            ORDER BY subject.name ASC
        `, [teacherId]);

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "internal server error"
        });
    }
};
const deleteStudentEvaluationsController = async (req, res) => {
    const evaluation_id = req.params.id;
    try {
        const [result] = await db.query('DELETE FROM evaluations WHERE id = ?', [evaluation_id]);
        if (result.affectedRows === 0) {
            return res.status(400).json({
                error: "evaluation doesn't exist"
            });
        }

        return res.status(200).json({
            message: "evaluation deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};
const sortByNameController = async (req, res) => {
    const { name } = req.query;

    if (!name || name.trim() === "") {
        return res.status(400).json({
            error: "name is required"
        });
    }

    try {
        const [result] = await db.query(
              `SELECT DISTINCT
        student.id,
        student.username,
        student.email,
        student.date_of_birth,
        classes.name AS class
     FROM users AS teacher
     JOIN teaching_assignments AS assignment
         ON assignment.teacher_id = teacher.id
     JOIN users AS student
         ON student.class_id = assignment.class_id
     JOIN classes
         ON classes.id = student.class_id
     WHERE teacher.id = ?
     AND LOWER(student.username) LIKE LOWER(?)
       AND teacher.role = 'teacher'
       AND student.role = 'student'`,
            [req.user.id,`%${name.trim()}%`]
        );

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            error: "internal server error"
        });
    }
};

module.exports = {
    getTeacherDashboardController,
    getStudentController,
    createStudentEvaluation,
    getTeacherEvaluationsController,
    updateStudentEvaluations,
    getTeacherClassesController,
    getTeacherSubjectsController,
    deleteStudentEvaluationsController,
    sortByNameController
};