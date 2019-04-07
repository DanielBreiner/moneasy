/**
 * @file Express router for all main views.
 */

const router = require('express').Router();
const middlewares = require("./middlewares");

router.get("/", (req, res) => {
    res.render("index");
});
router.get("/crossroad", middlewares.authorize, (req, res) => {
    res.render("crossroad");
});
router.get("/dashboard", middlewares.authorize, (req, res) => {
    res.render("dashboard");
});
router.get("/goal", middlewares.authorize, (req, res) => {
    res.render("goal");
});

module.exports = router;