const express = require('express');
const { check, validationResult } = require("express-validator");
const router = express.Router();
const ProfAuth = require('../../models/ProfAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//the frontend will send username here, and this will send back the hash, which the frontend will compare
router.post("/", [
    check("username").not().isEmpty(),
    check("password").not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(412).json({ errors: errors.array() }); //412: precondition failed
        }
        const username  = req.body.username;
        const password = req.body.password;
        try {
            let prof = await ProfAuth.findOne({ username: username });
            //console.log(prof);
            if (!prof) {
               return res.status(204).json("user does not exist");
            }
            else if(bcrypt.compareSync(password, prof.hash) === true) {
                
                const  expiresIn  =  24  *  60  *  60;
                const  accessToken  =  jwt.sign({ username: prof.username,
                                                  name: prof.name,
                                                  department: prof.department,
                                                  email: prof.email}, process.env.SECRET_KEY_BCRYPT, {expiresIn:  expiresIn});
                return res.json({
                    headers:{'Access-Control-Allow-Origin' : "*"},
                    token: accessToken
                })
                
            }
            else{
                return res.status(205).json({msg: "Incorrect password"});
            }
        }
        catch (err) {
            res.status(500).send("Server Error" + err);
        }
    });
router.get("/profLoggedIn",[
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('username').not().isEmpty(),
    check('department').not().isEmpty()
],async(req,res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(412).json({ errors: errors.array() }); //412: precondition failed
        }
     const token = req.query.token;
     return res.json(
         {
             name: token.name,
             username: token.username,
             department: token.department,
             email: token.email
         }
     )
});

router.get("/createAcc", [
    check('username').not().isEmpty(),
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').not().isEmpty(),
    check('department').not().isEmpty(), 
], async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(412).json({ errors: errors.array() });
        }

    const username = req.query.username;
    const password = req.query.password;
    const name = req.query.name;
    const email = req.query.email;
    const department = req.query.department;
    try{
        let prof = await ProfAuth.findOne({username: username});
        if(prof){
            return res.status(400).send("User already exists");
        }
        const saltRounds = 12;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err)
            {
                return res.status(500).send("Internal server error");
            }
            else{
                prof = new ProfAuth({
                    username: username,
                    hash: hash,
                    email :email,
                    name: name,
                    department: department
                });
                prof.save();
                return res.status(200).send({
                    username: username,
                    password: hash,
                    email :email,
                    name: name,
                    department: department
                });
            }
        });
        
    }
    catch(err)
    {
        res.status(500).send("Server error: "+err);
    }
})

module.exports = router;