import React, { Fragment, useState } from "react";
import { Select } from "react-select-tile";
import SelectOptions from "react-select";
import Creatable from "react-select";
import { components } from "react-select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

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

const slots = [
  { value: "0", label: "1:30 - 2:00 PM" },
  { value: "1", label: "2:00 - 2:30 PM" },
  { value: "2", label: "2:30 - 3:00 PM" },
  { value: "3", label: "3:00 - 3:30 PM" },
  { value: "4", label: "3:30 - 4:00 PM" },
  { value: "5", label: "4:00 - 4:30 PM" },
  { value: "6", label: "4:30 - 5:00 PM" },
  { value: "7", label: "5:30 - 5:30 PM" }
];
const branches = [
  { value: "BIO", label: "Biological Sciences" },
  { value: "CHE", label: "Chemical Engineering" },
  { value: "CHEM", label: "Chemistry" },
  { value: "CE", label: "Civil Engineering" },
  { value: "CS", label: "Computer Science" },
  { value: "ECO", label: "Economics & Finance" },
  { value: "ECE", label: "Electrical & Communication Engineering" },
  { value: "EEE", label: "Electrical & Electronics Engineering" },
  { value: "INSTR", label: "Electronics & Instrumentation Engineering" },
  { value: "MATH", label: "Mathematics" },
  { value: "ME", label: "Mechanical Engineering" },
  { value: "PHA", label: "Pharmacy" },
  { value: "PHY", label: "Physics" }
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
    branch: [],
    year: "",
    slotNumber: "",
    humanitiesCourses: []
  });

  const { branch, year, slotNumber, humanitiesCourses } = formData;

  const handleSlotChange = value => {
    setFormData({
      ...formData,
      slotNumber: value
    });
  };
  const handleBranchChange = newBranch => {
    setFormData({
      ...formData,
      branch: newBranch
    });
  };
  const handleYearChange = e => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        year: e.target.value
      });
    }
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
    } else if (!branch || branch.length === 0) {
      window.alert("Please enter your branch");
    } else if (year === "") {
      window.alert("Please enter your year");
    } else {
      submitForm(slotNumber, humanitiesCourses, branch, year);
    }
  };

  const addCourse = () => {
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
    return <Redirect to='/dashboard'></Redirect>;
  }

  const Menu = props => {
    const optionSelectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {optionSelectedLength < 2 ? (
          props.children
        ) : (
          <div className='wide-menu-row'>
            You cannot select more than 2 branches
          </div>
        )}
      </components.Menu>
    );
  };
  const isValidNewOption = (inputValue, selectValue) =>
    inputValue.length > 0 && selectValue.length < 5;

  return (
    <Fragment>
      <p className='title'>
        Hi! We would like to know a few things before you continue.
      </p>
      <form className='form-whole' onSubmit={e => onSubmit(e)}>
        <Select
          placeholder='Please select slot'
          className='hf-width'
          value={slotNumber}
          options={slots}
          onItemClick={handleSlotChange}
          containerStyle={{ backgroundColor: "#f9e3b4" }}
          menuStyle={{ backgroundColor: "#f9e3b4" }}
          menuItemStyle={{ backgroundColor: "#ffffff" }}
          activeItemStyle={{ backgroundColor: "#fecb6e" }}
        />
        <div className='container-helform'>
          <Creatable
            components={{ Menu }}
            onChange={handleBranchChange}
            value={branch}
            isMulti
            isValidNewOption={isValidNewOption}
            options={branch && branch.length >= 2 ? branch : branches}
            className='left-width branch-inp'
            placeholder='Select branch (select 2 for dual degree)'
            theme={theme => ({
              ...theme,
              borderRadius: 2,
              colors: {
                ...theme.colors,
                primary25: "#fecb6e",
                neutral0: "#f9e3b4"
              }
            })}
          />
          <p className='label-mod branch-inp'>Select year: </p>
          <FormControl component='fieldset' className='radio-grp'>
            <RadioGroup
              row
              aria-label='position'
              name='position'
              defaultValue='End'
              className='radio-grp'
            >
              <FormControlLabel
                value='1'
                control={<Radio color='primary' />}
                label='First'
                className='text-black'
                onChange={handleYearChange}
              />
              <FormControlLabel
                value='2'
                control={<Radio color='primary' />}
                label='Second'
                className='text-black'
                onChange={handleYearChange}
              />
              <FormControlLabel
                value='3'
                control={<Radio color='primary' />}
                label='Third'
                className='text-black'
                onChange={handleYearChange}
              />
              <FormControlLabel
                value='4'
                control={<Radio color='primary' />}
                label='Fourth'
                className='text-black'
                onChange={handleYearChange}
              />
              <FormControlLabel
                value='5'
                control={<Radio color='primary' />}
                label='Fifth'
                className='text-black'
                onChange={handleYearChange}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className='form-group'>
          <div className='form-courses'>
            {humanitiesCourses.map((_, idx) => {
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
          <input
            type='submit'
            className='btn btn-primary btn-hf btn-big'
            value='Submit'
          />
          <button
            type='button'
            className='btn btn-primary btn-big'
            onClick={e => addCourse(e)}
          >
            Add
          </button>
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
