import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import notificationStyles from './notificationStyles';

// Notification component
const Notification = ({ open, closeNotification, message, severity }) => {
  
  const classes = notificationStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeNotification();
  };

  let msghtml = ""

  if (typeof message === "string") {
      msghtml = message
  }
  if (Array.isArray(message)) {
      msghtml = message.map((line, index) => (
        <Fragment key={index}>
            <span>- {line}</span>
            <br></br>
        </Fragment>
      ))
  }

  return (
    <div className={classes.root}>
      {message === null && severity === null ? null : (
        <Snackbar open={open} autoHideDuration={20000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" severity={severity} onClose={handleClose}>
              {msghtml}
          </MuiAlert>
        </Snackbar>
      ) }
    </div>
  );
}

export default Notification;