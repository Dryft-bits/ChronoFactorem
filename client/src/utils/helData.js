import axios from 'axios';

export const searchHEL =async (strData) => {
    let studentsPerSlot = [];
    try {
        let res = await axios.get("/api/helData/searchHEL", {
            params: {
                "courseData": strData
            }
        }
        )
        studentsPerSlot = res.data.studentsInterestedInAllSlots;
    }
    catch (err) {
        console.log("DB RETRIEVAL ERROR:", err);
    }

    console.log("in util "+studentsPerSlot);

    return studentsPerSlot;
}
