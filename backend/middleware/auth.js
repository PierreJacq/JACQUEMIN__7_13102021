const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization  //.split(' ')[1];   Retiré pour l'instant
        const decodedToken = jwt.verify(token, process.env.LOGIN_TOKEN);
        const userId = decodedToken.idUser;
        if (req.body.idUser && req.body.idUser != userId) {
            res.status(404).json({
                error: 'User cannot be found'
            })
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};