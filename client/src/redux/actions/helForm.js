import axios from "axios";
import { SUBMIT_SUCCESS, SUBMIT_FAIL, UPDATE_INFO } from "./types";

export const submitForm = (
  slotNumber,
  humanitiesElectives,
  branch,
  year
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
      .then(function (response) {
        if (response.status !== 201) {
          throw new Error("Could not submit form.");
        }
      });
    const res = await axios.get("api/current_user");
    const email = res.data.email;

    let studentBranch = [];
    branch.forEach(element => {
      studentBranch.push(element["value"]);
    });
    const studentData = JSON.stringify({ email, studentBranch, year });
    await axios
      .post("/api/helform/firstlogin", studentData, config)
      .then(function (response) {
        if (response.status !== 201) {
          console.log("Update failed: " + response.status);
          throw new Error("Could not submit form.");
        } else {
          dispatch({
            type: SUBMIT_SUCCESS
          });
          dispatch({
            type: UPDATE_INFO,
            payload: { branch: studentBranch, year: year }
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
