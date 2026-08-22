const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db");
const express = require("express");

const getDashboardController = async (req, res) => {
    try {
        const [result] = await db.query('SELECT users.username,users.email,users.date_of_birth, classes.name AS class FROM users JOIN classes ON users.class_id = classes.id WHERE users.id = ?', [req.user.id]);
        if (result.length == 0) {
            return res.status(400).json({ error: `there is no student with that id ` });
        }
        return res.status(200).json(result[0])
    } catch (error) {
        return res.status(500).json({ error: `internal server error` });
    }
}
const getSubjectsController = async (req, res) => {
    try {
        const [result] = await db.query(
            `SELECT
            subjects.id AS id,
                subjects.name AS subject,
                teacher.username AS teacher
             FROM users AS student
             JOIN teaching_assignments AS assignment
                 ON assignment.class_id = student.class_id
             JOIN subjects
                 ON subjects.id = assignment.subject_id
             JOIN users AS teacher
                 ON teacher.id = assignment.teacher_id
             WHERE student.id = ?
               AND student.role = 'student'`,
            [req.user.id]
        );

        if (result.length === 0) {
            return res.status(404).json({
                error: 'no subjects found for this student'
            });
        }

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({
            error: 'internal server error'
        });
    }
};

const getEvaluationController = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT
                evaluation.id,
                evaluation.grade,
                evaluation.opinion,

                teacher.id AS teacher_id,
                teacher.username AS teacher,

                subject.id AS subject_id,
                subject.name AS subject

            FROM evaluations AS evaluation

            JOIN teaching_assignments AS assignment
                ON assignment.id = evaluation.teaching_assignment_id

            JOIN users AS teacher
                ON teacher.id = assignment.teacher_id

            JOIN subjects AS subject
                ON subject.id = assignment.subject_id

            WHERE evaluation.student_id = ?

            ORDER BY evaluation.updated_at DESC
        `, [req.user.id]);

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "internal server error"
        });
    }
};
const getSpecificEvaluationController = async (req, res) => {
    const evaluation_id = req.params.id;
    try {
        const [result] = await db.query('SELECT grade , opinion FROM evaluations WHERE id=? AND student_id=?', [evaluation_id, req.user.id]);
        if (result.length === 0) {
            return res.status(404).json({
                error: 'no grades or opinion yet'
            });
        }
        return res.status(200).json(result[0]);
    } catch (error) {
        return res.status(500).json({
            error: 'internal server error'
        });
    }
}
module.exports = { getDashboardController, getSubjectsController, getEvaluationController,getSpecificEvaluationController };