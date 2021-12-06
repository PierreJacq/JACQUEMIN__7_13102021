const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const checkAuthorId  = (req) => {
    const tokenToDecode = req.headers.authorization;
    const userTokenDecoded = jwt.verify(tokenToDecode, process.env.LOGIN_TOKEN);
    const requestAuthorId = userTokenDecoded.id;
    return requestAuthorId;
};

module.exports = checkAuthorId;