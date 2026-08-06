const jwt = require("jsonwebtoken");
require("dotenv").config();

function verification(req, res, next) {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).json({error:`no token provided`})
    }
    const token = authorization.split(" ")[1];
    try {
        const match = jwt.verify(token, process.env.JWT_SECRET);
        req.user = match;//this return the id username and role
    } catch (error) {
        return res.status(401).json({ error: `invalid token ` })
    }
    next();
}
module.exports=verification;