/**
 * @file Express routing for /auth subpages - all authentication subpages.
 * @author Daniel Breiner <danielbreinerd@gmail.com>
 */

const router = require('express').Router();
const passport = require("passport");

// Google auth
router.get('/google', passport.authenticate("google", {
    scope: ["profile"]
}));
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect("/crossroad");
});

// Facebook auth
router.get('/facebook', passport.authenticate('facebook', {
    scope: []
}));
router.get('/facebook/redirect', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/crossroad');
});

// Logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;