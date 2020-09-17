import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CartItem from './CartItem';
import { Typography, Button } from '@material-ui/core';

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

const Cart = ({ cart, isAuth }) => {
  const classes = useStyles();
  return cart === null || isAuth === false || Object.keys(cart).length === 0 ?  (
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
  ) : cart.cartItems.length === 0 && isAuth == true ? (
    <Typography className={classes.text} align="center">
      You have no items in your cart. Get started by adding some!
    </Typography>
  ) : (
    <Grid
      // container
      maxWidth="md"
      // justify="center"
      className={classes.cardGrid}
    >
      {cart.cartItems.map((cartItem) => (
        <CartItem cartItem={cartItem} />
      ))}
      <div className={classes.root}>
        <Paper className={classes.paper}>
            <Grid item className={classes.totalBox}>
              <Typography >Total: ${cart.cartTotal}</Typography>
              <Button component={Link} to='/checkout'>
              Checkout
              </Button>
            </Grid>
        </Paper>
        </div>

    </Grid>
  );
};

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.item.cart,
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {})(Cart);

