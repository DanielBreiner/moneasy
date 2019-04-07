module.exports = {
    authorize: (req, res, next) => {
        if (req.user){
            next()
        } else {
            res.redirect("/");
        }
    }
}