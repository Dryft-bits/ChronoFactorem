const mongoose = require('mongoose');
const express = require('express');
import Hel from "../../models/Hel.js";
const router = express.Router();
router.post("/api/helData/searchHEL",[], 
    async (req, res) => {
    console.log(req.body);
    const elective = req.body;
    let hel = await Hel.findOne({ courseName: elective });
    console.log(hel);
    const courseSlots = hel.studentsInterestedInSlot;
    const studentsInterestedInAllSlots = [];
    
    for(let slotNo = 0;slotNo < 8; ++slotNo)
        studentsInterestedInAllSlots.push(courseSlots.get(slotNo).parseInt());

    res.send(studentsInterestedInAllSlots);
    
    });
module.exports = router;
