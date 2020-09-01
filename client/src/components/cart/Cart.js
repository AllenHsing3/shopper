import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
  cardGrid: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(8),
  },
  text: {
    paddingTop: theme.spacing(24),
  },
}));

const Cart = ({ cart }) => {
  const classes = useStyles();
  return cart === null  ? (
    <Typography className={classes.text} align="center">
      Start shopping by{' '}
      <Button component={Link} to="/login">
        logging in
      </Button>
      or{' '}
      <Button component={Link} to="/register">
        registering
      </Button>
    </Typography>
  ) : cart.cartItems.length === 0  || Object.keys(cart).length === 0  ? (
    <Typography className={classes.text} align="center">
      You have no items in your cart.
    </Typography>
  ) : (
    <Grid
      // container
      maxWidth="md"
      justify="center"
      className={classes.cardGrid}
    >
      {cart.cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} />
      ))}
      <Grid>
        <Typography>${cart.cartTotal}</Typography>
      </Grid>
    </Grid>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.item.cart,
});

export default connect(mapStateToProps, {})(Cart);
{
  /* <div>
<Container className={classes.cardGrid} maxWidth="md">
  <Grid container spacing={1}>
    {cart.cartItems.map((cartItem) => (
      <CartItem cartItem={cartItem} />
    ))}
  </Grid>
</Container>
</div> */
}
