const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db");
const express = require("express");

const getStatisticController = async (req, res) => {
    try {
        const [result] = await db.query("SELECT COUNT(CASE WHEN role = 'student' THEN 1 END) AS students,  COUNT(CASE WHEN role = 'teacher' THEN 1 END) AS teachers, COUNT(CASE WHEN role = 'staff' THEN 1 END) AS staff FROM users;");
        const [classes] = await db.query('SELECT COUNT(*) AS classes FROM classes;')
        return res.status(200).json({ ...result[0], ...classes[0] });
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}
const getUsersController = async (req, res) => {
    try {
        const [result] = await db.query('SELECT id,username,email,role,date_of_birth,status FROM users');
        if (result.length == 0) {
            return res.status(400).json({ error: `empty users` })
        }
        return res.status(200).json(result)
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })

    }
}
const getUserController = async (req, res) => {
    const id = req.params.id;
    try {
        const [user] = await db.query('SELECT username,email,role,date_of_birth,status FROM users WHERE id =?', [id]);
        if (user.length == 0) {
            return res.status(400).json({ error: `empty users` })
        }
        res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })

    }
}
const updateUserController = async (req, res) => {
    const id = req.params.id;
    const { username, email, role, date_of_birth, status } = req.body;
    if (email.trim().toLowerCase() == ""
        || username.trim() == ""
        || role.trim() == ""
        || date_of_birth.trim() == ""
        || status.trim() == "") {
        return res.status(400).json({ error: `invalid inputs` })
    }
    try {//check for a user with the same new email except for the current user
        const [isEmail] = await db.query('SELECT * FROM users WHERE email=? AND id!=?', [email.trim().toLowerCase(),id]);
        if (isEmail.length != 0) {
            return res.status(400).json({ error: `email already exists` });
        }
        const [result] = await db.query('UPDATE  users SET username=?,email=?,role=?,date_of_birth=?, status=? WHERE id=?',[username.trim(), email.trim().toLowerCase(), role.trim().toLowerCase(), date_of_birth.trim(), status.trim().toLowerCase(), id]);
        if (result.affectedRows==0) {
            return res.status(404).json({ error: "user not found" });
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })

    }
}
module.exports = { getStatisticController, getUsersController, getUserController };