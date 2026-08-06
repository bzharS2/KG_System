const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db");
const express = require("express");

const studentProfileController = async(req, res) => {
    try {
        const [result]= await db.query('SELECT')
    } catch (error) {

    }
}
module.exports = studentProfileController