import React from 'react';
import { connect } from 'react-redux';
import { useGetData } from 'use-axios-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { editTT } from '../../actions/UpdateTimeTable';

const Dashboard = props => {
  const [TTData, setTTData] = React.useState({
    savedTT: null
  });
  const { savedTT } = TTData;

  function edit(tt) {
    props.editTT(tt);
  }

  function deleteTT(id) {
    try {
      axios.delete(`/api/timetable/delete/${id}`).then(res => {
        if (res.status === 200) {
          window.alert('Successfully Deleted the Timetable');
        } else {
          window.alert(res.data.msg);
        }
        let newData = (TTData.savedTT || data).filter(item => item._id !== id);
        setTTData({ savedTT: newData });
      });
    } catch (err) {
      window.alert("Couldn't Delete The TimeTable! Please Try Again Later.");
    }
  }

  function toggleShare(id, action) {
    try {
      axios.get(`/api/timetable/toggleShare/${id}`).then(res => {
        if (res.status === 200) {
          window.alert('Successfully ' + action + ' the Timetable');
        } else {
          window.alert(res.data.msg);
        }
        let newData = [];
        for (let item of TTData.savedTT || data) {
          if (item._id === id) {
            item.isShared = !item.isShared;
          }
          newData.push(item);
        }
        setTTData({ savedTT: newData });
      });
    } catch (err) {
      window.alert(
        "The TimeTable Couldn't be " + action + '! Please Try Again Later.'
      );
    }
  }
  let [data, loading] = useGetData('/api/timetable/getTT');

  if (!loading) {
    return (
      <div style={{ float: 'left', width: '40 vw' }}>
        {' '}
        {(TTData.savedTT || data).map(item => {
          return (
            <>
              <div className="courseItem" key={item} id={item}>
                {item.name}
              </div>
              <Link
                to="/create"
                onClick={() => {
                  edit(item);
                }}
              >
                Edit
              </Link>
              <button
                onClick={() => {
                  deleteTT(item._id);
                }}
              >
                Delete
              </button>
              {item.isShared ? (
                <button
                  onClick={() => {
                    toggleShare(item._id, 'Unshared');
                  }}
                >
                  Unshare
                </button>
              ) : (
                <button
                  onClick={() => {
                    toggleShare(item._id, 'Shared');
                  }}
                >
                  Share
                </button>
              )}
            </>
          );
        })}
      </div>
    );
  } else {
    return <h3>FETCHING LATEST DATA....</h3>;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    editTT: tt => dispatch(editTT(tt))
  };
};

Dashboard.propTypes = {
  editTT: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Dashboard);
