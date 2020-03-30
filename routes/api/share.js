import Student from "../../models/Student";
import express from 'express';
import TimeTable from "../../models/TimeTable";
import mongoose from 'mongoose';
//import { check, validationResult } from "express-validator";
const router = express.Router();


let ObjectId = mongoose.Types.ObjectId;
router.get("/shareTT", async (req, res) => {
    let branch = req.query.branch;
    let year = req.query.year;
    if (year === undefined || isNaN(year)) {

        res.send(null);
    }
    else {
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