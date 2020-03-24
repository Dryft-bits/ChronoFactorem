const mongoose = require('mongoose');
const express = require('express');
const Hel = require("../../models/Hel");
const router = express.Router();

router.get("/searchHEL", async (req, res) => {
    try {
        //console.log(req.body);
        const elective = req.query.courseData;
        console.log("in api" + elective);
        //elective = req.body;
        /*
        if(typeof(req.body) === "string"){
        elective = encodeURIComponent(req.body);
        }
        else
        {
         //elective = encodeURIComponent(Object.keys(req.body)[0]);
         //console.error(elective);
        }
        */
        let courseSlots = "";
        let result = await Hel.findOne({ courseName: elective });
        console.log(result);
        if (result == null) {
            console.log("m9, null");
            res.send(null);
        }
        else {
            console.log("courseSLots:");
            courseSlots = result.studentsInterestedInSlot;
            console.log(courseSlots);
            const studentsInterestedInAllSlots = [];

            for (let slotNo of ['0', '1', '2', '3', '4', '5', '6', '7'])
                studentsInterestedInAllSlots.push(courseSlots.get(slotNo));

            console.log("oof " + studentsInterestedInAllSlots);
            res.json({ studentsInterestedInAllSlots });
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
}
);

module.exports = router;
