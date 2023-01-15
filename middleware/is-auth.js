module.exports = (req, res, next) => {
    if (req.session.isAuth) {
       // console.log(req.session)
        next();
    } else {
       req.session.error = "You have to Login first";
       // res.redirect("/login");
        res.status(401).send(`Вы не авторизованы`);
    }
};

