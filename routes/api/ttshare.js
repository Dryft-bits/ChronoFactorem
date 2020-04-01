import express from 'express';
import TimeTable from "../../models/TimeTable";
import mongoose from 'mongoose';
import { query, validationResult } from "express-validator";
const router = express.Router();
const loggedIn = require("../../middleware/auth");
router.get("/shareTT",
    [
        loggedIn,
        query("id")
            .not()
            .isEmpty(),
        query("id")
            .isArray()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else {
            let StudentIDs = req.query.id;
            let ownerIds = [];
            for (let item of StudentIDs) {
                ownerIds.push(mongoose.Types.ObjectId(item));
            }
            try {
                await TimeTable.find({ ownerId: { $in: ownerIds }, isShared: true }, (error, docs) => {
                    if (error) { res.status(500).send(err); }
                    else {
                        let TTList = [];
                        for (let TT of docs) {
                            TTList.push(TT);
                        }
                        res.json(TTList);
                    }
                });
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }
        }
    })

module.exports = router;