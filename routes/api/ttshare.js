import Student from "../../models/Student";
import express from 'express';
import TimeTable from "../../models/TimeTable";
import mongoose from 'mongoose';
//import { check, validationResult } from "express-validator";
const router = express.Router();


let ObjectId = mongoose.Types.ObjectId;
router.get("/shareTT", async (req, res) => {
    let StudentIDs = req.query.id;
    //console.log(StudentIDs);
    //console.log(isNaN(StudentIDs));
    if (StudentIDs === undefined || StudentIDs.length === 0) {
        res.send(null);
    }
    //let year = req.query.year;
    else {
        if (StudentIDs === null) {

            console.log("m8, null");
            res.send(null);
        }
        else {
            let ownerIds = [];
            /*
            StudentIDs.forEach(item => {
                ownerIds.push(new ObjectId(item));
            })
            */
            //console.log(StudentIDs)
            for (let item of StudentIDs) {
                ownerIds.push(ObjectId(item));
            }
            try {
                await TimeTable.find({ ownerId: { $in: ownerIds }, isShared: true }, (error, docs) => {

                    if (error) { res.status(500).send(err); }
                    else {
                        let TTList = [];
                        for (let TT of docs) {
                            TTList.push(TT);
                        }

                        
                        if (TTList.length === 0) {
                            
                            res.status(501).send("Server issue in fetching");
                        }
                        else {

                            res.json(TTList);
                        }
                    }
                });

            }
            catch (err) {
                console.error(err.message);
                res.status(500).send("Server error");
            }

        }
    }
})

module.exports = router;