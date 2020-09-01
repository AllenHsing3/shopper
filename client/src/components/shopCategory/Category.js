import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { loadItems } from '../../actions/item';
import { connect } from 'react-redux';
import ItemCard from './ItemCard';
import Spinner from '../layout/Spinner';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const Category = ({ match, loadItems, items, loading }) => {
  useEffect(() => {
    loadItems(match.params.category);
  }, []);
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {loading ? (
            <Spinner />
          ) : (
            items.map((item) => item.category === match.params.category ? <ItemCard category={match.params.category} item={item} />: null)
          )}
        </Grid>
      </Container>
    </div>
  );
};

Category.propTypes = {
  loadItems: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.item.items,
  loading: state.item.loading,
});

export default connect(mapStateToProps, { loadItems })(Category);
