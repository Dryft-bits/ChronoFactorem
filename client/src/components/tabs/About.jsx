import React from 'react';
import { makeStyles,createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles({
  root: {
    minWidth: "25vw",
    maxWidth: "75vw",
    margin: "1vh",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minWidth: 250,
    margin: "1vh",
  }
});
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2"
    }
  }
});
const About = () => {
  const classes = useStyles();
  

  return (
    <>
      <br></br>
      <div style={{ display:'flex', justifyContent:'center' }}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              About the Project
            </Typography>
            <Typography variant="h5" component="h2">
              ChronoFactorem
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Description
            </Typography>
            <Typography variant="body1" component="p">
            ChronoFactorem is a time-table web app primarily aimed at students in our campus. One of the main features of BITS Pilani is flexibility: one of them being that students can choose their timetable. This web-app can help students make a draft timetable before the actual registration, in order to prevent confusion before and during the registration due to poor planning and lack of information on courses such as the number of people planning on taking it, thus causing significant delays and discomfort to students and the admissions division during the start of the semester.  Students can preview and save their draft timetables and share them with others in order to help people registering for similar courses deal with clashes / timings of classes. Students and teachers can also view the statistics of the courses – such as how many students want to take a course. Features such as mid-semester and comprehensive schedules, lunch hours and clashes which are checked during the actual registration is also shown here in order and students are warned about packed schedules and/or before they proceed with their draft. Essentially, this would emulate a mock timetable making experience –without the time constraints to minimize bad decisions and unnecessary despair.
            </Typography>
          </CardContent>
          <ThemeProvider theme={theme}>
            <CardActions>
              <Button variant="contained" size="large" color="primary" startIcon={<GitHubIcon/>} style={{marginLeft:"0.5vw",marginBottom:"1.5vh"}} href="https://github.com/Dryft-bits/ChronoFactorem" target="_blank">Learn More</Button>
            </CardActions>
          </ThemeProvider>
        </Card>
      </div>
    </>
  );
};

export default About;
