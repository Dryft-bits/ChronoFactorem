import React, { useState } from "react";
import { Link } from "react-router-dom";
import Creatable from "react-select";
import { components } from "react-select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { useGetData } from "use-axios-react";
import "../../styles/ShareTT.css";
import { editTT } from "../../actions/UpdateTimeTable";

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
  { value: "MANU", label: "Manufacturing Engineering" },
  { value: "MATH", label: "Mathematics" },
  { value: "ME", label: "Mechanical Engineering" },
  { value: "PHA", label: "Pharmacy" },
  { value: "PHY", label: "Physics" }
];

const ShareTimeTable = (props) => {
  const [formData, setFormData] = useState({
    branch: props.user
      ? branches.filter(branch => props.user["branch"].includes(branch["value"]))
      : [],
    year: props.user ? props.user.year.toString() : "",
    TTs: []
  });

  const { branch, year, TTs } = formData;

  const submitToMongo = (branch, year) => {
    let TTData = [];
    try {
      let br = [];
      branch.forEach(item => {
        br.push(item["value"]);
      });

      axios
        .get("/api/timetable/viewshared", {
          params: {
            branch: br,
            year: year
          }
        })
        .then(resp => {
          if (resp.status === 422 || resp.data.length === 0) {
            TTData = [];
          }
          else if (resp.status !== 200) {
            throw new Error("Could not submit query");
          }
          else {
            TTData = JSON.parse(JSON.stringify(resp["data"]));
          }
          setFormData({ ...formData, TTs: TTData });
        })
    }
    catch (err) {
      window.alert(err.message);
    }
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

  const onSubmit = async e => {
    e.preventDefault();
    if (!branch || branch.length === 0) {
      window.alert("Please enter your branch");
    } else if (year === "" || year === NaN) {
      window.alert("Please enter your year");
    } else {
      submitToMongo(branch, year);
    }
  };

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

  const [userInfo, loading] = useGetData("/api/timetable/viewshared");
  return (
    <>
      <p className='title'>
        Please Enter your Branch and year below:
      </p>
      <form className='form-whole' onSubmit={onSubmit}>
        <div className='container-helform'>
          <Creatable
            components={{ Menu }}
            onChange={handleBranchChange}
            value={branch}
            isMulti
            isValidNewOption={isValidNewOption}
            options={branch && branch.length >= 2 ? branch : branches}
            className='left-width branch-inp'
            placeholder='Select branch (select 2 branches for dual degree)'
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
                checked={year === '1'}
              />
              <FormControlLabel
                value='2'
                control={<Radio color='primary' />}
                label='Second'
                className='text-black'
                onChange={handleYearChange}
                checked={year === '2'}
              />
              <FormControlLabel
                value='3'
                control={<Radio color='primary' />}
                label='Third'
                className='text-black'
                onChange={handleYearChange}
                checked={year === '3'}
              />
              <FormControlLabel
                value='4'
                control={<Radio color='primary' />}
                label='Fourth'
                className='text-black'
                onChange={handleYearChange}
                checked={year === '4'}
              />
              <FormControlLabel
                value='5'
                control={<Radio color='primary' />}
                label='Fifth'
                className='text-black'
                onChange={handleYearChange}
                checked={year === '5'}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            className='btn btn-primary btn-hf btn-big'
            value='Submit'
          />
        </div>
      </form>
      {!loading && TTs.length !== 0 ? (
        TTs.map(item => {
          return (
            <>
              <div key={item._id}>
                <p>TT name: {item.name}</p>
                <p>{item.ownerId === null ? "Student name unavailable" : "By: " + item.ownerId.name}</p>
                <p>Date: {item.date.substr(0, item.date.indexOf('T'))}</p>
                <p>Time: {item.date.substr(item.date.indexOf('T') + 1, 9)}</p>
                <Link
                  to='/create'
                  onClick={() => {
                    props.editTT(item);
                  }}
                >
                  <button>View/Edit</button>
                </Link>
              </div>
            </>
          );
        })
      ) : (loading ? <h3>Loading</h3> :
        <h3>NO TT</h3>
        )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editTT: tt => dispatch(editTT(tt, true))
  };
};

ShareTimeTable.propTypes = {
  editTT: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ShareTimeTable);
