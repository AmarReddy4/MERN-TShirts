const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");



router.post(
    "/signup",
    [
        check("name", "name should at least 3 characters long").isLength({ min: 3}),
        check("email", "enter a valid email").isEmail(),
        check("password", "enter a password with at least 3 characters long").isLength({ min: 3}),
    ],
    signup
);


router.post(
    "/signin",
    [
        check("email", "enter a valid email").isEmail(),
        check("password", "enter your password").isLength({ min: 3}),
    ],
    signin
);

router.get("/signout", signout);

module.exports = router;