module.exports = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
       req.session.error = "You have to Login first";
        res.status(401).send(`Вы не авторизованы`);
    }
};

