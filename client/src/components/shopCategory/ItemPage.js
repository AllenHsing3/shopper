import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadItem, addToCart } from '../../actions/item';
import Spinner from '../layout/Spinner';
import {
  Container,
  Grid,
  Typography,
  Button,
  CssBaseline,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import { setAlert } from '../../actions/alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    maxHeight: '800px',
    spacing: '3',
  },
  cardMedia: {
    paddingTop: '100%',
    maxWidth: '100%',
  },
}));

const ItemPage = ({
  match,
  item,
  loadItem,
  loading,
  isAuthenticated,
  setAlert,
  addToCart,
  userId
}) => {
  useEffect(() => {
    loadItem(match.params.id);
  }, []);
  const classes = useStyles();
  const { name, description, price, longDescription, _id } = item;
  const handleClick = (e) => {
    e.preventDefault();
    if (isAuthenticated === false) {
      return setAlert('Please login to add to cart', 'error');
    } else{
    const quantity = "1"
    addToCart({_id, quantity, userId});
    setAlert('Added to cart', 'success')
    }
  };
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Container component="main" maxHeight="md">
          <CssBaseline />
          <div className={classes.paper}>
            <Grid container width="100%" spacing={2}>
              <Grid item xs={6}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3">{name}</Typography>
                <Typography variant="h4">{description}</Typography>
                <Typography variant="h5">${price}</Typography>
                <Typography variant="h5">{longDescription}</Typography>
                <Button onClick={(e) => handleClick(e)}>Add to Cart</Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      )}
    </div>
  );
};

ItemPage.propTypes = {
  item: PropTypes.object.isRequired,
  loadItem: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item.item,
  loading: state.item.loading,
  userId: state.auth.user._id,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadItem, setAlert, addToCart })(
  ItemPage
);
