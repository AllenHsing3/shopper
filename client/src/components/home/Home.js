import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(24),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: 'inherit',
    textAlign: 'center'
  },
}));

const Home = ({ name }) => {
  let welcomeMessage = 'Welcome to Shopper!';
  if (name) welcomeMessage = `Welcome to Shopper, ${name}!`;

  const classes = useStyles();
  return (
    <Box overflow="hidden !important" justifyContent="center">
      <Paper className={classes.paper}>
        <Typography variant="h5">{welcomeMessage}</Typography>
        <Typography variant="h6">A mock shopping website</Typography>
      </Paper>
    </Box>
  );
};

Home.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.auth.user.name,
});

export default connect(mapStateToProps, {})(Home);
