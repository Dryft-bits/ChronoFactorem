const express = require('express');
const TimeTable = require("../../models/TimeTable");
const mongoose = require('mongoose');
const { query, validationResult } = require("express-validator");
const router = express.Router();
const loggedIn = require("../../middleware/auth");
router.get("/shareTT",
    [
        loggedIn,
        query("branch").isArray(),
        query("year").not()
                    .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else {
            /*
            let ownerIds = [];
            for (let item of StudentIDs) {
                ownerIds.push(mongoose.Types.ObjectId(item));
            }
            */
            try {
                console.log(req.query.branch, req.query.year);
                await TimeTable.find({isShared:true}).populate({path:'ownerId', match:{'branch':req.query.branch , 'year':parseInt(req.query.year)}, select:'name'}).exec(
                  (error, docs) => {
                    if (error) { res.status(500).send(err); }
                    else {
                        let TTList = [];
                        for (let TT of docs) {
                            TTList.push(TT);
                        }
                        console.log(TTList);
                        res.json(TTList);
                    }
                })
            }
            catch (err) {
                console.log("My name jeff");
                console.error(err.message);
                res.status(500).send("Server error");
            }
        }
    })

module.exports = router;