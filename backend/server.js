require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const app = express();

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes)



async function startServer() {
    try {
        await db.getConnection();
        console.log("Connected to MySQL!");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}
startServer();
