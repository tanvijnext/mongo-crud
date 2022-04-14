const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authentication'];
    if (!token) {
        res.send({
            message: 'Token provided not found'
        });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            if (err.toString() === 'TokenExpiredError: jwt expired') {
                res.send({
                    message: 'Please LogIn First..'
                });
            }
            res.send({
                message: 'Failed to authentication'
            });
        }
        delete decoded.iat;
        delete decoded.exp;
        req.token_parse = decoded;
        return next();
    });
}

module.exports = verifyToken;