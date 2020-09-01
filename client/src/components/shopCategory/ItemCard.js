import React from 'react';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

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

const ItemCard = ({ item: { name, description, price, _id }, category }) => {
  const classes = useStyles();

  return (

    <Grid item xs={12} sm={6} md={4} >
      <Card component={Link} to={`/${category}/item/${_id}`} className={classes.card} >
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2" >
            {name}
          </Typography>
          <Typography>{description}</Typography>
          <Typography>{price}</Typography>
        </CardContent>
        {/* </Link> */}
      </Card>
    </Grid>
  );
};

ItemCard.propTypes = {};

export default ItemCard;
