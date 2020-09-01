import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const SetAlert = ({ alerts }) => 
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Snackbar key={alert.id} open >
         <MuiAlert severity={alert.alertType}>
           {alert.msg}
        </MuiAlert>
    </Snackbar>
  ));
  // return (
  //   alerts !== null &&
  //   alerts.length > 0 &&
  //   alerts.map((alert) => (
  //     <Snackbar
  //       key={alert.id}
  //       open={open}
  //       autoHideDuration={6000}
  //       onClose={handleClose}
  //     >
  //       <Alert onClose={handleClose} severity={alert.alertType}>
  //         {alert.msg}
  //       </Alert>
  //     </Snackbar>
  //   ))
  // );


SetAlert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(SetAlert);
