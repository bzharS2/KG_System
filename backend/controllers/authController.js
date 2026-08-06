const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const db = require("../db");
const e = require("express");
//check class exist as well

const createStudentController = async (req, res) => {
    const role = "student"
    const { Username, Email, Password, DoB, Class_id } = req.body;
    if (Username.trim() == "" ||
        Email.trim() == "" ||
        Password.trim() == "" ||
        DoB.trim() == "" ||
        !Class_id) {
        return res.status(400).json({ error: `invalid inputs` })
    }// then check whether email exists already or no
    try {
        const [emailResult] = await db.query('SELECT * FROM users where email=?', [Email.trim().toLowerCase()]);
        if (emailResult.length > 0) {
            return res.status(409).json({ error: `Email already exists` });
        }
        const [classResult] = await db.query('SELECT * FROM classes where id=?', [Class_id]);
        if (classResult.length == 0) {
            return res.status(409).json({ error: `Class doesn't exist` });
        }
        const hashedPassword = await bcrypt.hash(Password, 10);
        await db.query('INSERT INTO users (username,email,password,role,date_of_birth,class_id) VALUES(?,?,?,?,?,?)', [Username.trim(), Email.trim().toLowerCase(), hashedPassword, role, DoB, Class_id]);
        return res.status(201).json({ message: `Student enrolled successfully` })
    } catch (err) {
        return res.status(500).json({ error: `internal sever error` })
    }
}

const createStaffController = async (req, res) => {
    const role = "staff";
    const { username, email, password, dateOfBirth } = req.body;
    const result = await createUser(
        username,
        email,
        password,
        dateOfBirth,
        role
    );
    if (!result.check) {
        return res.status(400).json({
            message: result.text
        });
    }
    return res.status(201).json({
        message: result.text + ' users role is: ' + role
    });
};

const createTeacherController = async (req, res) => {
    const role = "teacher";
    const { username, email, password, dateOfBirth } = req.body;
    const result = await createUser(
        username,
        email,
        password,
        dateOfBirth,
        role
    );
    if (!result.check) {
        return res.status(400).json({
            message: result.text
        });
    }
    return res.status(201).json({
        message: result.text + ' user role is: ' + role
    });
};
async function createUser(username, email, password, dateOfBirth, role) {
    if (username.trim() == "" ||
        email.trim() == "" ||
        password.trim() == "" ||
        dateOfBirth.trim() == ""
    ) {
        return {
            check: false,
            text: "Invalid inputs"
        };
    }
    try {
        const [result] = await db.query('SELECT * FROM users WHERE email=?', [email.trim()])
        if (result.length > 0) {
            return {
                check: false,
                text: "Email already exists"
            };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(
            "INSERT INTO users (username, email, password, role, date_of_birth) VALUES (?, ?, ?, ?, ?)",
            [
                username.trim(),
                email.trim().toLowerCase(),
                hashedPassword,
                role,
                dateOfBirth
            ]
        );
        return {
            check: true,
            text: "User created successfully"
        };


    } catch (error) {
        return {
            check: false,
            text: "internal sever error"
        };


    }



}

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

module.exports = { createStudentController, createStaffController, createTeacherController, loginController };