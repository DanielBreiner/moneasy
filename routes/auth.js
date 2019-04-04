const router = require('express').Router();
const passport = require("passport");

router.get('/google', passport.authenticate("google", {
    scope: ["profile"]
}));

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/crossroad");
})

router.get('/facebook', passport.authenticate('facebook', {
    scope: []
}));

router.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/crossroad');
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

module.exports = router;