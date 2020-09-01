import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {Link} from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    justifyContent: 'space-between',
  },
  toolbarTitle: {
    justifySelf: 'center',
  },
  toolbarSecondary: {
    justifyContent: 'center',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 1,
  },
}));

const Navbar = ({ isAuthenticated, logout }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    logout();
  };
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   return <Redirect to="login" />;
  // };

  const authLinks = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={(e) => handleLogout(e)}>
      <Button component={Link} to="/">Logout</Button>
      </MenuItem>
    </Menu>
  );
 const handleRedirect = e => {
   e.preventDefault()
   return <Redirect to='/login'/>
 }
  const guestLinks = (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <Button component={Link} to="/login">Login</Button>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Button component={Link} to="/register">Register</Button>
      </MenuItem>
    </Menu>
  );

  const sections = [
    { category: "What's New", url: '/category/new' },
    { category: 'Shirts', url: '/category/shirts' },
    { category: 'Pants', url: '/category/pants' },
    { category: 'Shoes', url: '/category/shoes' },
    { category: 'Accessories', url: '/category/accessories' },
  ];

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <div>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountCircleIcon size="small" />
          </Button>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
        <div className={classes.toolbarTitle}>
          <Button component={Link} to='/'>
            <Typography color="inherit" variant="h4">
              Shopper
            </Typography>
          </Button>
        </div>
        <div>
          <Button component={Link} to="/cart" size="small">
            <ShoppingCartIcon />
          </Button>
        </div>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Button
            color="inherit"
            noWrap
            component={Link}
            key={section.url}
            variant="body2"
            to={section.url}
            // href={section.url}
            className={classes.toolbarLink}
          >
            {section.category}
          </Button>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Navbar);

{/* <Link
color="inherit"
noWrap
key={section.category}
variant="body2"
component={RouterLink}
href={section.url}
className={classes.toolbarLink}
>
{section.category}
</Link> */}
