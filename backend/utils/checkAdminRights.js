const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const checkAdminRights = (req) => {
    const tokenToDecode = req.headers.authorization;
    const adminTokenDecoded = jwt.verify(tokenToDecode, process.env.LOGIN_TOKEN);
    const requestAuthorIsAdmin = adminTokenDecoded.isAdmin;
    return requestAuthorIsAdmin;
};

module.exports = checkAdminRights;