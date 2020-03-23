import axios from 'axios';

export const searchHEL = async (strData)  =>
{
    let studentsPerSlot = [];
    try{
        await axios.post("/api/helData/searchHEL",strData)
                    .then(res => {
                        console.log(res);
                        studentsPerSlot = JSON.parse(JSON.stringify(res)); //deepcopy
                    });
    }
    catch(err)
    {
        console.log("DB RETRIEVAL ERROR:",err);
    }

    if(studentsPerSlot != [])
    {
        console.log(studentsPerSlot);
    }

    return studentsPerSlot;
}
