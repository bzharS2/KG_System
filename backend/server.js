require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db");

const authRoutes = require("./routes/authRoutes");
//const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(express.json());
app.use(cors());

db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Connected to MySQL!");
});


app.use('/',authRoutes)





app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});