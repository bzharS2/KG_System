const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const db = require("../db");
//check class exist as well

const createStudentController = (req, res) => {
    const role = "student"
    const { Username, Email, Password, DoB, Class_id } = req.body;
    if (Username.trim() == "" ||
        Email.trim() == "" ||
        Password.trim() == "" ||
        DoB.trim() == "" ||
        !Class_id) {
        return res.status(400).json({ error: `invalid inputs` })
    }// then check whether email exists already or no
    db.query('SELECT * FROM users where email=?', [Email.trim().toLowerCase()], async (err, result) => {
        if (err) {
            return res.status(400).json({ error: err })
        } else if (result.length == 1) {
            return res.status(409).json({ error: `Email already exists` })
        }
        // check whether the class exist
        db.query('SELECT * FROM classes where id=?', [Class_id], (err, result) => {
            if (err) {
                return res.status(400).json({ error: err })
            } else if (result.length != 1) {
                return res.status(409).json({ error: `class does not exist` })
            }
        })
        // then hash the password
        try {
            const hashedPassword = await bcrypt.hash(Password, 10);
            db.query('INSERT INTO users (username,email,password,role,date_of_birth,class_id) VALUES(?,?,?,?,?,?)', [Username.trim(), Email.trim().toLowerCase(), hashedPassword, role, DoB, Class_id], (err, result) => {
                if (err) {
                    return res.status(400).json({ error: err })
                }
                return res.status(201).json({ message: `Student enrolled successfully` })
            })
        } catch (err) {
            return res.status(400).json({ error: `internal sever error` })

        }
    })
}

module.exports = { createStudentController };