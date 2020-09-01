import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import {Grid, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(24),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
  },
}));

const Home = (props) => {
  const classes = useStyles();
  return (
    <Box
      overflow="hidden !important"

      justifyContent="center"
    >
      <Paper className={classes.paper} >
      <Typography variant="h5" color="black" align="center">
        Welcome to Shopper!
      </Typography>
      <Typography variant="h6" color="black" align="center">
        A mock shopping website
      </Typography>
      </Paper>
    </Box>
  );
};

Home.propTypes = {};

export default Home;
