import Student from "../../models/Student";
import express from 'express';
import mongoose from 'mongoose';
import { query, validationResult } from "express-validator";
const router = express.Router();


let ObjectId = mongoose.Types.ObjectId;
router.get("/shareTT",
    [
        query("branch").not().isEmpty(),
        query("branch").isArray(),
        query("year").not().isEmpty()
    ]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }
        else {
            let branch = req.query.branch;
            let year = req.query.year;

            year = parseInt(year);

            let StudentIDs = [];
            try {
                await Student.find({ 'branch': branch, 'year': year }, (err, docs) => {

                    let ownerIDList = [];
                    for (let doc of docs) {
                        ownerIDList.push(doc["_id"]);
                    }

                    StudentIDs = JSON.parse(JSON.stringify(ownerIDList));
                    res.json(StudentIDs);
                }

                );
            }
            catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }


        }
    }
);

module.exports = router;