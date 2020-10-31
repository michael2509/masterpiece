import React, { Fragment } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Notification = ({ open, closeNotification, message, severity }) => {
  
  const classes = useStyles();

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
          <Alert severity={severity} onClose={handleClose}>
              {msghtml}
          </Alert>
        </Snackbar>
      ) }
    </div>
  );
}

export default Notification;