const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db");
const express = require("express");

//check class exist as well


const loginController = async (req, res) => {
    const { email, password } = req.body;
    if (email.trim().toLowerCase() == "" || password.trim() == "") {
        return res.status(400).json({ error: `invalid email or password` })
    }
    try {
        const [result] = await db.query('SELECT * FROM users WHERE email=?', [email.trim().toLowerCase()]);
        if (result.length != 1) {
            return res.status(400).json({ error: `invalid email or password` })
        }
        const active = result[0].status;
        if (active == "inactive") {
            return res.status(400).json({ error: `this account has been deactivated` })
        }
        const hashedPassword = result[0].password;
        const match = await bcrypt.compare(password, hashedPassword);
        if (!match) {
            return res.status(400).json({ error: `invalid email or password` })
        }
        const token = jwt.sign({
            id: result[0].id,
            username: result[0].username,
            role: result[0].role
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        return res.status(200).json({
            message: `user logged in successfully`,
            token: token,
        })

    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }


}

module.exports = { loginController };