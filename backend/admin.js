// this file is only used once

const bcrypt = require("bcrypt");
const db = require("./InitialSetUp/testDb");

async function seedAdmin() {
  try {
    const username = "admin";
    const email = "admin@school.com";
    const password = "ChangeThisPassword123";

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      `INSERT INTO users
      (username, email, password, role, status)
      VALUES (?, ?, ?, ?, ?)`,
      [
        username,
        email,
        hashedPassword,
        "admin",
        "active"
      ]
    );

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedAdmin();