import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { loadReceipts } from '../../actions/item';
import OrderCard from './OrderCard';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 900,
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  text: {
    paddingTop: theme.spacing(24),
  },
  totalBox: {
    textAlign: 'end',
  },
}));

const Orders = ({ receipts, loadReceipts, userId }) => {
  useEffect(() => {
    loadReceipts(userId);
  }, []);

  const classes = useStyles();
  return receipts === [] ? (
    <Typography className={classes.text} align="center">
      You have not placed any orders. Get started by adding an item into your
      cart!
    </Typography>
  ) : (
    <Grid maxWidth="md" className={classes.cardGrid}>
      {receipts.map((receipt) => (
        <OrderCard receipt={receipt} />
      ))}
    </Grid>
  );
};

Orders.propTypes = {
  receipts: PropTypes.array.isRequired,
  loadReceipts: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  receipts: state.item.receipts,
  userId: state.auth.user._id,
});

export default connect(mapStateToProps, { loadReceipts })(Orders);
