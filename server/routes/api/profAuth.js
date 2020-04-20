const express = require('express');
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Professor = require('../../models/Professor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post("/", [
    check("username","username is required").not().isEmpty(),
    check("password","password is required").not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(412).json({ errors: errors.array() }); //412: precondition failed
        }
        const username = req.body.username;
        const password = req.body.password;
        try {
            let prof = await Professor.findOne({ username: username });
            if (!prof) {
                return res.status(204).json({ msg: "user does not exist" });
            }
            else if (bcrypt.compareSync(password, prof.hash) === true) {

                const expiresIn = 24 * 60 * 60;
                const accessToken = jwt.sign({
                    username: prof.username,
                    name: prof.name,
                    department: prof.department,
                    email: prof.email
                }, process.env.SECRET_KEY_BCRYPT, { expiresIn: expiresIn });
                return res.json({
                    headers: { 'Access-Control-Allow-Origin': "*" },
                    token: accessToken
                })

            }
            else {
                return res.status(206).json({ msg: "Incorrect password" });
            }
        }
        catch (err) {
            res.status(500).send("Server Error" + err);
        }
    });
router.post("/profLoggedIn", [
    check('token',"token is required").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({ errors: errors.array() }); //412: precondition failed
    }
    const token = req.body.token;
    jwt.verify(token, process.env.SECRET_KEY_BCRYPT, (err, data) => {
        if (err) {
            return res.json(null);
        }
        else {
            return res.json(
                {
                    name: data.name,
                    username: data.username,
                    department: data.department,
                    email: data.email
                })
        }

    });
});

router.post("/createAcc", [
    check('username',"username is required").not().isEmpty(),
    check('name',"name is required").not().isEmpty(),
    check('email',"email is either empty or is invalid").isEmail(),
    check('password',"password is required").not().isEmpty(),
    check('department',"department is required").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({ errors: errors.array() });
    }

    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const email = req.body.email;
    const department = req.body.department;
    try {
        let prof = await Professor.findOne({ username: username });
        if (prof) {
            return res.status(206).send("User already exists");
        }
        const saltRounds = 12;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                return res.status(500).send("Internal server error");
            }
            else {
                prof = new Professor({
                    username: username,
                    hash: hash,
                    email: email,
                    name: name,
                    department: department
                });
                prof.save();
                return res.status(200).send({
                    username: username,
                    password: hash,
                    email: email,
                    name: name,
                    department: department
                });
            }
        });

    }
    catch (err) {
        res.status(500).send("Server error: " + err);
    }
})

module.exports = router;