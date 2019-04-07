/**
 * @file Custom express.js middlewares
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

module.exports = {
    authorize: (req, res, next) => {
        if (req.user){
            next()
        } else {
            res.redirect("/");
        }
    }
}