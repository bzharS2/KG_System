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
    const { username, email, role, password, date_of_birth, status } = req.body;
    if (email.trim().toLowerCase() == ""
        || username.trim() == ""
        || role.trim() == ""
        || date_of_birth.trim() == ""
        || status.trim() == ""
    ) {
        return res.status(400).json({ error: `invalid inputs` })
    }
    if (!id || id == 0) {
        return res.status(400).json({ error: "invalid user id" });
    }
    try {//check for a user with the same new email except for the current user


        const [isEmail] = await db.query('SELECT * FROM users WHERE email=? AND id!=?', [email.trim().toLowerCase(), id]);
        if (isEmail.length != 0) {
            return res.status(400).json({ error: `email already exists` });
        }
        if (password.trim() == "") {
            const [resultNoPass] = await db.query('UPDATE  users SET username=?,email=?,role=?,date_of_birth=?, status=? WHERE id=?', [username.trim(), email.trim().toLowerCase(), role.trim().toLowerCase(), date_of_birth.trim(), status.trim().toLowerCase(), id]);
            if (resultNoPass.affectedRows == 0) {
                return res.status(404).json({ error: "user not found" });
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await db.query('UPDATE  users SET username=?,email=?,password=?,role=?,date_of_birth=?, status=? WHERE id=?', [username.trim(), email.trim().toLowerCase(), hashedPassword, role.trim().toLowerCase(), date_of_birth.trim(), status.trim().toLowerCase(), id]);
            if (result.affectedRows == 0) {
                return res.status(404).json({ error: "user not found" });
            }
        }
        return res.status(200).json({ message: `user updated successfully` });
    } catch (error) {
        return res.status(500).json({ error: error })

    }
}


const updateStatusController = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    if (status.trim() == "") {
        return res.status(400).json({ error: `invalid input` })
    }

    try {
        const [result] = await db.query('UPDATE users SET status = ? WHERE id= ?', [status.trim().toLowerCase(), id]);
        if (result.affectedRows == 0) {
            return res.status(400).json({ error: `user doesn't exist` })
        }
        return res.status(200).json({
            message: `student status updated successfully`,
        })
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}

// CRUD operations for Classes
const getClassesController = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM classes');
        if (result.length == 0) {
            return res.status(404).json({ error: `no classes found` })
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}
const createClassesController = async (req, res) => {
    const className = req.body.name;
    if (className.trim() == "") {
        return res.status(400).json({ error: `invalid inputs` })
    }
    try {
        const [check] = await db.query(`SELECT * FROM classes WHERE name = ? `, [className]);
        if (check.length !== 0) {
            return res.status(400).json({ error: `a class with that name already exists` });
        }
        const [result] = await db.query('INSERT INTO classes (name) VALUES(?)', [className.trim().toUpperCase()])
        return res.status(200).json({ message: `class created successfully` })

    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}
const updateClassesController = async (req, res) => {
    const id = req.params.id;
    const className = req.body.name;
    if (className.trim() == "") {
        return res.status(400).json({ error: `invalid inputs` })
    }
    try {
        const [check] = await db.query(`SELECT * FROM classes WHERE id=?`, [id]);
        if (check.length !== 1) {
            return res.status(400).json({ error: `that class doesn't exist` })
        }
        const [checkClassName] = await db.query(`SELECT * FROM classes WHERE id!=? AND name = ?`, [id, className.trim().toUpperCase()])
        if (checkClassName.length !== 0) {
            return res.status(400).json({ error: `names must be unique` })
        }
        const [result] = await db.query('UPDATE classes SET name=? WHERE id=?', [className.trim().toUpperCase(), id])
        if (result.affectedRows == 0) {
            return res.status(400).json({ error: `class wasn't updated` })
        }
        return res.status(200).json({ message: `class updated successfully` })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}
const deleteClassController = async (req, res) => {
    const class_id = req.params.id;
    try {
        const [classes] = await db.query(`SELECT * FROM classes WHERE id = ?`, [class_id]);
        const [assignments] = await db.query(`SELECT * FROM teaching_assignments WHERE class_id=?`, [class_id]);
        const [students] = await db.query(`SELECT * FROM users WHERE class_id=? AND role='student'`, [class_id])
        if (classes.length === 0) {
            return res.status(400).json({ error: `that class doesn't exist` });
        } else if (assignments.length !== 0) {
            return res.status(409).json({ error: `that class has an assignment or evaluation to it` });
        } else if (students.length !== 0) {
            return res.status(400).json({ error: `that class has students in it` });
        }
        const [result] = await db.query(`DELETE FROM classes WHERE id=?`, [class_id]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: `that class didn't get deleted` });

        }
        return res.status(200).json({ message: `class deleted successfully` });
    } catch (error) {
        return res.status(500).json({ error: `internal server error` });
    }
}
// CRUD operations for teacherAssignments.
const getTeacherAssignmentsController = async (req, res) => {
    try {
        const [result] = await db.query(`
            SELECT
                assignment.id,
                teacher.username AS teacher,
                subject.name AS subject,
                class.name AS class
            FROM teaching_assignments AS assignment
            JOIN users AS teacher
                ON teacher.id = assignment.teacher_id
            JOIN subjects AS subject
                ON subject.id = assignment.subject_id
            JOIN classes AS class
                ON class.id = assignment.class_id
        `);

        if (result.length === 0) {
            return res.status(404).json({
                error: "NOT FOUND"
            });
        }

        return res.status(200).json(result);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "internal server error"
        });
    }
}
const createTeacherAssignmentController = async (req, res) => {
    const { teacher_id, subject_id, class_id } = req.body;
    if (!teacher_id || teacher_id === 0 || subject_id === 0 || !subject_id || !class_id || class_id === 0) {
        return res.status(400).json({ error: `invalid inputs` });
    }
    try {
        const [teachers] = await db.query(`SELECT * FROM users WHERE id=? AND role='teacher'`, [teacher_id]);
        const [subjects] = await db.query(`SELECT * FROM subjects WHERE id=?`, [subject_id]);
        const [classes] = await db.query(`SELECT * FROM classes WHERE id =?`, [class_id]);
        const [check] = await db.query(`SELECT * FROM teaching_assignments WHERE teacher_id=? AND subject_id=? AND class_id=?`, [teacher_id, subject_id, class_id]);

        if (teachers.length === 0) {
            return res.status(404).json({ error: `Teacher doesn't exist` });
        } else if (subjects.length === 0) {
            return res.status(404).json({ error: `subject doesn't exist` });
        } else if (classes.length === 0) {
            return res.status(404).json({ error: `class doesn't exist` });
        } else if (check.length !== 0) {
            return res.status(400).json({ error: `that assignment already exists` });
        }
        const [create] = await db.query(`INSERT INTO teaching_assignments (teacher_id,subject_id,class_id) VALUES(?,?,?) `, [teacher_id, subject_id, class_id]);
        if (create.affectedRows === 0) {
            return res.status(400).json({ error: `nothing added` });
        }
        return res.status(201).json({ message: `Teaching assignment added successfully` });

    } catch (error) {
        return res.status(500).json({ error: `internal sever error` })
    }
}
const updateTeacherAssignmentController = async (req, res) => {
    const { teacher_id, subject_id, class_id } = req.body;
    const assignment_id = req.params.id;
    if (!teacher_id || teacher_id === 0 || subject_id === 0 || !subject_id || !class_id || class_id === 0 || !assignment_id || assignment_id == 0) {
        return res.status(400).json({ error: `invalid inputs` });
    }
    try {
        const [teachers] = await db.query(`SELECT * FROM users WHERE id=? AND role='teacher'`, [teacher_id]);
        const [subjects] = await db.query(`SELECT * FROM subjects WHERE id=?`, [subject_id]);
        const [classes] = await db.query(`SELECT * FROM classes WHERE id =?`, [class_id]);
        const [assignment] = await db.query(`SELECT * FROM teaching_assignments WHERE id=?`, [assignment_id]);
        const [check] = await db.query(`SELECT * FROM teaching_assignments WHERE teacher_id=? AND subject_id=? AND class_id=? AND id != ?`, [teacher_id, subject_id, class_id, assignment_id]);


        if (teachers.length === 0) {
            return res.status(404).json({ error: `Teacher doesn't exist` });
        } else if (subjects.length === 0) {
            return res.status(404).json({ error: `subject doesn't exist` });
        } else if (classes.length === 0) {
            return res.status(404).json({ error: `class doesn't exist` });
        } else if (assignment.length === 0) {
            return res.status(400).json({ error: `that assignment doesn't exist` })
        } else if (check.length !== 0) {
            return res.status(400).json({ error: `that assignment already exists` });
        }

        const [update] = await db.query(`UPDATE teaching_assignments set teacher_id=? , subject_id=? , class_id=? WHERE id=?`, [teacher_id, subject_id, class_id, assignment_id]);
        if (update.affectedRows === 0) {
            return res.status(400).json({ error: `assignment didn't get updated` })
        }
        return res.status(200).json({ message: `assignment updated successfully` });
    } catch (error) {
        return res.status(500).json({ error: `internal sever error` })
    }
}
const deleteTeacherAssignmentController = async (req, res) => {
    const assignment_id = req.params.id;

    try {
        // i can't delete immediately if because the might be an evaluation with that id therefore we must check if evaluation exists first;
        const [check] = await db.query(`SELECT * FROM evaluations WHERE teaching_assignment_id=?`, [assignment_id]);
        if (check.length !== 0) {
            return res.status(409).json({ error: `evaluation exists with that id therefore you can't delete` })
        }
        const [result] = await db.query(`DELETE FROM teaching_assignments WHERE id=?`, [assignment_id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: `Assignment NOT FOUND` })
        }
        return res.status(200).json({ message: `assignment deleted successfully` });
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}

//CRUD operations for subjects
const getSubjectsController = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM subjects');
        if (result.length == 0) {
            return res.status(404).json({ error: `no classes found` })
        }
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}
const createSubjectsController = async (req, res) => {
    const subjectName = req.body.name;
    if (subjectName.trim() == "") {
        return res.status(400).json({ error: `invalid inputs` })
    }
    const formattedName =
        subjectName.trim().charAt(0).toUpperCase() +
        subjectName.trim().slice(1).toLowerCase();
    try {
        const [check] = await db.query(`SELECT * FROM subjects WHERE name=?`, [formattedName]);
        if (check.length != 0) {
            return res.status(400).json({ error: `A subject with that name exists already` });

        }
        const [result] = await db.query('INSERT INTO subjects (name) VALUES(?)', [formattedName])
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: `idk something happened` });
        }
        return res.status(200).json({ message: `subject created successfully` });
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}
const updateSubjectsController = async (req, res) => {
    const id = req.params.id;
    const subjectName = req.body.name;
    if (subjectName.trim() == "") {
        return res.status(400).json({ error: `invalid inputs` });
    }
    const formattedName =
        subjectName.trim().charAt(0).toUpperCase() +
        subjectName.trim().slice(1).toLowerCase();

    try {
        const [check] = await db.query(`SELECT * FROM subjects WHERE id=?`, [id]);
        if (check.length !== 1) {
            return res.status(400).json({ error: `that subject doesn't exist` });
        }
        const [checkSubjectName] = await db.query(`SELECT * FROM subjects WHERE id!=? AND name = ?`, [id, formattedName]);
        if (checkSubjectName.length !== 0) {
            return res.status(400).json({ error: `names must be unique` });
        }
        const [result] = await db.query('UPDATE subjects SET name=? WHERE id=?', [formattedName, id]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: `that subject didn't get updated` });

        }
        return res.status(200).json({ message: `subject updated successfully` })
    } catch (error) {
        return res.status(500).json({ error: `internal server error` })
    }
}
const deleteSubjectController = async (req, res) => {
    const subject_id = req.params.id;
    try {
        const [subjects] = await db.query(`SELECT * FROM subjects WHERE id = ?`, [subject_id]);
        const [assignments] = await db.query(`SELECT * FROM teaching_assignments WHERE subject_id=?`, [subject_id]);
        if (subjects.length === 0) {
            return res.status(400).json({ error: `that subject doesn't exist` });
        } else if (assignments.length !== 0) {
            return res.status(409).json({ error: `that subject has an assignment or evaluation to it` });
        }
        const [result] = await db.query(`DELETE FROM subjects WHERE id=?`, [subject_id]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ error: `that subject didn't get deleted` });

        }
        return res.status(200).json({ message: `subject deleted successfully` });
    } catch (error) {
        return res.status(500).json({ error: `internal server error` });
    }
}

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
        return res.status(500).json({ error: err })
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

const sortByTeacher = async (req, res) => {
    const result = await sortUsers("role", "teacher");

    if (!result) {
        return res.status(500).json({ error: "internal server error" });
    }

    return res.status(200).json(result);
};

const sortByStaff = async (req, res) => {
    const result = await sortUsers("role", "staff");

    if (!result) {
        return res.status(500).json({ error: "internal server error" });
    }

    return res.status(200).json(result);
};

const sortByStudent = async (req, res) => {
    const result = await sortUsers("role", "student");

    if (!result) {
        return res.status(500).json({ error: "internal server error" });
    }

    return res.status(200).json(result);
};

const sortByActive = async (req, res) => {
    const result = await sortUsers("status", "active");

    if (!result) {
        return res.status(500).json({ error: "internal server error" });
    }

    return res.status(200).json(result);
};

const sortByInactive = async (req, res) => {
    const result = await sortUsers("status", "inactive");

    if (!result) {
        return res.status(500).json({ error: "internal server error" });
    }

    return res.status(200).json(result);
};

async function sortUsers(column, value) {
    try {
        const [result] = await db.query(
            `SELECT id, username, email, role, date_of_birth, status
             FROM users
             WHERE ${column}=?
             ORDER BY username ASC`,
            [value]
        );

        return result;
    } catch (error) {
        return false;
    }
}

module.exports = {
    sortByTeacher,
    sortByStaff,
    sortByStudent,
    sortByActive,
    sortByInactive,
    createStaffController,
    createStudentController,
    createTeacherController,
    deleteClassController,
    deleteTeacherAssignmentController,
    updateTeacherAssignmentController,
    createTeacherAssignmentController,
    getTeacherAssignmentsController,
    createClassesController,
    getClassesController,
    getStatisticController,
    getUsersController,
    getUserController,
    updateUserController,
    updateStatusController,
    updateClassesController,
    getSubjectsController,
    createSubjectsController,
    updateSubjectsController,
    deleteSubjectController
};