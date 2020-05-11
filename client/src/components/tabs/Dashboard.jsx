import React from "react";
import { connect } from "react-redux";
import { useGetData } from "use-axios-react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { editTT } from "../../redux/actions/UpdateTimeTable";
import ShareTimeTable from "./ShareTimeTable";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import AlertBox from "../utils/AlertBox.jsx";
import "../../styles/Dashboard.css";

const useStyles = makeStyles({
  root: {
    minWidth: 250,
    margin: "1vh",
  },
  cardcontainer: {
    width: "100%",
    maxWidth: "95vw",
    maxHeight: "30vh",
    overflow: "auto",
  },
  grid: {
    flexGrow: 1,
    maxWidth: "95vw",
    maxHeight: "26vh",
    overflow: "auto",
  },
});
const Dashboard = (props) => {
  const classes = useStyles();
  const [TTData, setTTData] = React.useState({
    savedTT: null,
    AlertMsg: { status: false, type: null, msg: null },
  });
  const { savedTT, AlertMsg } = TTData;

  function deleteTT(id) {
    let newMsg;
    try {
      axios.delete(`/api/timetable/delete/${id}`).then((res) => {
        if (res.status === 200) {
          let newData = (savedTT || data).filter((item) => item._id !== id);
          newMsg = {
            status: true,
            type: "success",
            msg: "Successfully Deleted the Timetable",
          };
          setTTData({ savedTT: newData, AlertMsg: newMsg });
        } else {
          newMsg = {
            status: true,
            type: "error",
            msg: res.data.msg + " Please Try Again Later",
          };
          setTTData({ ...TTData, AlertMsg: newMsg });
        }
      });
    } catch (err) {
      newMsg = {
        status: true,
        type: "error",
        msg: "Couldn't Delete The TimeTable! Please Try Again Later.",
      };
      setTTData({ ...TTData, AlertMsg: newMsg });
    }
  }

  function toggleShare(id, action) {
    let newMsg;
    try {
      axios.get(`/api/timetable/toggleShare/${id}`).then((res) => {
        if (res.status === 200) {
          let newData = [];
          for (let item of savedTT || data) {
            if (item._id === id) {
              item.isShared = !item.isShared;
            }
            newData.push(item);
          }
          newMsg = {
            status: true,
            type: "success",
            msg: "Successfully " + action + " the Timetable",
          };
          setTTData({ savedTT: newData, AlertMsg: newMsg });
        } else {
          newMsg = {
            status: true,
            type: "error",
            msg: res.data.msg,
          };
          setTTData({ ...TTData, AlertMsg: newMsg });
        }
      });
    } catch (err) {
      newMsg = {
        status: true,
        type: "error",
        msg: "res.data.msg" + " Please Try Again Later",
      };
      setTTData({ ...TTData, AlertMsg: newMsg });
    }
  }
  let [data, loading] = useGetData("/api/timetable/getTT");

  if (!loading) {
    return (
      <>
        <AlertBox
          AlertMsg={AlertMsg}
          handleClose={() => {
            setTTData({
              ...TTData,
              AlertMsg: { status: false, type: null, msg: null },
            });
          }}
        />
        <h4 className="title">Saved Timetables</h4>
        <h4 className="title">Saved Timetables</h4>
        <div
          className={classes.grid}
          style={{ position: "relative", left: "2vw" }}
        >
          <Grid container style={{ backgroundColor: "#74b9ff" }}>
            {(TTData.savedTT || data).map((itemc) => {
              return (
                <>
                  <Grid item xs={6}>
                    <div key={itemc._id} id={itemc._id}>
                      <Card className={classes.root}>
                        <CardContent>
                          <Typography
                            className={classes.root}
                            color="textSecondary"
                            gutterBottom
                          >
                            Name
                          </Typography>
                          <Typography variant="h5" component="h2">
                            {itemc.name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Link
                            to="/create"
                            onClick={() => {
                              props.editTT(itemc);
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Edit
                            </Button>
                          </Link>

                          <Button
                            onClick={() => {
                              deleteTT(itemc._id);
                            }}
                            variant="contained"
                            color="secondary"
                            size="small"
                          >
                            Delete
                          </Button>
                          {itemc.isShared ? (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                toggleShare(itemc._id, "Unshared");
                              }}
                            >
                              Unshare
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                toggleShare(itemc._id, "Shared");
                              }}
                            >
                              Share
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </div>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </div>

        <h4 className="title">Publicily Shared Timetables</h4>
        <ShareTimeTable />
      </>
    );
  } else {
    return <h4>FETCHING LATEST DATA....</h4>;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    editTT: (tt) => dispatch(editTT(tt)),
  };
};

Dashboard.propTypes = {
  editTT: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Dashboard);
