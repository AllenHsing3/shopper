import React from 'react';
import { connect } from 'react-redux'
import {removeItem} from '../../actions/item'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 900,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  priceBox: {
      textAlign:'end'
  }
}));

const CartItem = ({
  cartItem: {
    cartItemName,
    cartItemId,
    cartItemCategory,
    quantityInCart,
    itemPrice,
    itemDescriptionLong,
    itemDescriptionShort,
  }, removeItem
}) => {
  const classes = useStyles();
  const handleRemove = e => {
      e.preventDefault()
      removeItem(cartItemId)
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase
              className={classes.image}
              component={Link}
              to={`/${cartItemCategory}/item/${cartItemId}`}
            >
              <img
                className={classes.img}
                alt="complex"
                src="https://source.unsplash.com/random"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {cartItemName}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {itemDescriptionShort}
                </Typography>
                <Typography variant="body2" maxLength="150" gutterBottom>
                  {itemDescriptionLong}
                </Typography>
              </Grid>
              {/* <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid> */}
            </Grid>
            <Grid item className={classes.priceBox} >
              <Typography variant="subtitle1">{itemPrice}</Typography>
              <Button onClick={e => handleRemove(e)} >
                Remove
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

CartItem.propTypes = {
    removeItem: PropTypes.func.isRequired,
};

export default connect(null, {removeItem})(CartItem);
