import axios from "axios";
import { SUBMIT_SUCCESS, SUBMIT_FAIL } from "./types";

export const submitForm = (
  slotNumber,
  humanitiesElectives
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const helData = JSON.stringify({ slotNumber, humanitiesElectives });

  try {
    await axios
      .post("/api/helform/submit", helData, config)
      .then(function(response) {
        if (response.status !== 201) {
          throw "Could not submit form.";
        }
      });
    const res = await axios.get("api/current_user");
    const email = res.data.email;
    const studentEmail = JSON.stringify({ email });
    await axios
      .post("/api/helform/firstlogin", studentEmail, config)
      .then(function(response) {
        if (response.status !== 201) {
          console.log("Update failed: " + response.status);
          throw "Could not submit form.";
        } else {
          dispatch({
            type: SUBMIT_SUCCESS
          });
        }
      });
  } catch (err) {
    console.log(err);
    window.alert(err);
    dispatch({
      type: SUBMIT_FAIL
    });
  }
};
