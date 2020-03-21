import axios from 'axios';

export const searchHEL = (strData) => async retrieve =>
{
    try{
        await axios.post('/api/helData/searchcourse',strData);

    }
    catch(err)
    {
        console.log("DB RETRIEVAL ERROR:",err);
    }
}