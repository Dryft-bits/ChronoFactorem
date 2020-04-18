const express = require('express');
const { check, validationResult } = require("express-validator");
const router = express.Router();
const ProfAuth = require('../../models/ProfAuth');
//the frontend will send username here, and this will send back the hash, which the frontend will compare
router.get("/", [
    check("username").not().isEmpty(),
    check("password").not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { username } = req.query;
        try {
            let prof = await ProfAuth.findOne({ username: username });
            if (!prof) {
               return res.send(null);
            }
            else {
                const  expiresIn  =  24  *  60  *  60;
                const  accessToken  =  jwt.sign({ username: prof.username,
                    name: prof.name,
                    department: prof.department,
                    email: prof.email,
                    password: prof.password }, SECRET_KEY, {
                expiresIn:  expiresIn
                 });
                return res.json({
                    
                    token: accessToken
                })
                
            }
        }
        catch (err) {
            res.status(500).send("Server Error" + err);
        }
    });

router.get("/createAcc/:username", [
    check('username').not().isEmpty()
], async (req, res) => {
    const username = req.params.username;
    try{
        let user = await ProfAuth.findOne({username: username});
        if(!user)
        {
            return res.status(200).send("ok");
        }
        else{
           return res.status(403).send("User already exists");
        }
    }
    catch(err)
    {
        res.status(500).send("Server error: "+err);
    }
})

export default router;