import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(24),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: 'inherit',
    textAlign:'center'
  },
}));

const About = (props) => {
  const classes = useStyles();
  return (
    <Box overflow="hidden !important" justifyContent="center">
      <Paper className={classes.paper}>
        <Typography variant="h6">Hello! Thank you for checking out my website.</Typography>
        <Typography variant="h6"> This project features the use of a MERN stack along with Stripe to process credit card payments.</Typography>
        <Typography variant="h6">As always, any input is very welcome, and much appreciated :)</Typography>
      </Paper>
    </Box>
  );
};

About.propTypes = {
};

export default About
