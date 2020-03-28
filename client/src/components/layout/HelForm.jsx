import React, { Fragment, useState } from "react";
import { Select } from "react-select-tile";
import { connect } from "react-redux";
import { submitForm } from "../../actions/helForm";
import PropTypes from "prop-types";

import ItemList from "../ItemList";
import Search from "../Search";
import * as TimeTableData from "../../Timetable.json";

import "../../styles/HelForm.css";

import { Redirect } from "react-router-dom";

let isEditingRowAtIndex = -1;

const courses = JSON.parse(JSON.stringify(TimeTableData)).default;
var humanitiesCodes = Object.keys(courses).filter(
  code =>
    code.startsWith("GS") ||
    code.startsWith("HSS") ||
    code.startsWith("BITS F214") ||
    code.startsWith("BITS F385") ||
    code.startsWith("BITS F399")
);
// Might need to add other BITS prefixed courses if more are added to the catalog at a later stage
// Currently, these are the only ones offered across all semesters

const options = [
  { value: "0", label: "1:30 - 2:00 PM" },
  { value: "1", label: "2:00 - 2:30 PM" },
  { value: "2", label: "2:30 - 3:00 PM" },
  { value: "3", label: "3:00 - 3:30 PM" },
  { value: "4", label: "3:30 - 4:00 PM" },
  { value: "5", label: "4:00 - 4:30 PM" },
  { value: "6", label: "4:30 - 5:00 PM" },
  { value: "7", label: "5:30 - 5:30 PM" }
];
const copyObjectProps = (source, keys) => {
  let newObject = {};
  keys.forEach(function(key) {
    newObject[key] = source[key];
  });
  return newObject;
};
let currentlyShowingCourses = copyObjectProps(courses, humanitiesCodes);

const HelForm = ({ submitForm, submitted, user }) => {
  const [formData, setFormData] = useState({
    slotNumber: "",
    humanitiesCourses: []
  });

  const { slotNumber, humanitiesCourses } = formData;

  const handleSlotChange = value => {
    setFormData({
      ...formData,
      slotNumber: value
    });
  };

  const deleteRow = (e, idx) => {
    humanitiesCourses.splice(idx, 1); // Remove row at index
    setFormData({ ...formData }); // Force component refresh
  };

  const editRow = (e, idx) => {
    if (e.target.innerHTML === "Edit") {
      e.target.innerHTML = "Done";
      isEditingRowAtIndex = idx;
    } else {
      e.target.innerHTML = "Edit";
      isEditingRowAtIndex = -1;
    }
    setFormData({ ...formData });
  };

  const onSubmit = async e => {
    e.preventDefault();
    var courseNotFilled = false;
    for (const course of humanitiesCourses) {
      if (course === "") {
        courseNotFilled = true;
        break;
      }
    }
    if (courseNotFilled) {
      window.alert("Please fill out all courses, or remove empty ones");
    } else if (slotNumber === "") {
      window.alert("Please enter your slot");
    } else {
      submitForm(slotNumber, humanitiesCourses);
    }
  };

  const addCourse = e => {
    addCourseToList();
    setFormData({
      ...formData
    });
  };

  const handleCourseAddition = e => {
    let event = e.target.innerHTML;
    if (!humanitiesCourses.includes(event)) {
      if (isEditingRowAtIndex !== -1) {
        humanitiesCourses[isEditingRowAtIndex] = event;
        setFormData({ ...formData });
      } else {
        addCourseToList();
        humanitiesCourses[isEditingRowAtIndex] = event;
        setFormData({ ...formData });
      }
    }
  };

  const addCourseToList = () => {
    humanitiesCourses.push("");
    isEditingRowAtIndex = humanitiesCourses.length - 1;
  };

  const filterItems = input => {
    let filterCourses = obj =>
      Object.keys(obj)
        .filter(
          item =>
            item.toLowerCase().search(input.target.value.toLowerCase()) !==
              -1 ||
            obj[item]["name"]
              .toLowerCase()
              .search(input.target.value.toLowerCase()) !== -1
        )
        .reduce((res, key) => ((res[key] = obj[key]), res), {});
    currentlyShowingCourses = filterCourses(courses);
    setFormData({ ...formData });
  };

  /**
   * Check to redirect to dashboard once user submits form
   * Cannot use api route to get submitted --> race condition, condition executes before state is updated
   * (new user conditions) || (old user conditions)
   */
  if ((!submitted && user && user.submittedForm) || submitted) {
    return <Redirect to='/helData'></Redirect>;
  }

  return (
    <Fragment>
      <p className='title'>
        Hi! We would like to know a few things before you continue.
      </p>
      <form className='form-whole' onSubmit={e => onSubmit(e)}>
        <Select
          placeholder='Please select slot'
          value={slotNumber}
          options={options}
          onItemClick={handleSlotChange}
          containerStyle={{ backgroundColor: "#f9e3b4" }}
          menuStyle={{ backgroundColor: "#f9e3b4" }}
          menuItemStyle={{ backgroundColor: "#ffffff" }}
          activeItemStyle={{ backgroundColor: "#fecb6e" }}
        />
        <div className='form-group'>
          <div className='form-courses'>
            {humanitiesCourses.map((course, idx) => {
              return (
                <div className='container-helform' key={idx}>
                  <input
                    className='course-inp'
                    type='text'
                    placeholder='Course name'
                    name='courseName'
                    value={humanitiesCourses[idx].replace("&amp;", "&")}
                    key={"inp" + idx.toString(10)}
                    disabled={isEditingRowAtIndex !== idx}
                    required
                    readOnly
                  ></input>
                  <button
                    className='btn btn-hf btn-mod'
                    type='button'
                    onClick={e => deleteRow(e, idx)}
                    key={"bdelete" + idx.toString(10)}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    className='btn btn-hf btn-mod'
                    onClick={e => editRow(e, idx)}
                    key={"bedit" + idx.toString(10)}
                  >
                    {isEditingRowAtIndex !== idx ? "Edit" : "Done"}
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type='button'
            className='btn btn-primary btn-big'
            onClick={e => addCourse(e)}
          >
            Add
          </button>
          <input
            type='submit'
            className='btn btn-primary btn-hf btn-big'
            value='Submit'
          />
        </div>
      </form>
      <div className='course-disp'>
        <Search action={filterItems} />
        <ItemList
          items={currentlyShowingCourses}
          action={handleCourseAddition}
        ></ItemList>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    submitted: state.helForm.submitted,
    user: state.auth.user
  };
};

HelForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  user: PropTypes.object
};

export default connect(mapStateToProps, { submitForm })(HelForm);
