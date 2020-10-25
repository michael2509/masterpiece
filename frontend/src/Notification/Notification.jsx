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

const Notification = ({ open, handleClose, messages, severity }) => {
  
  const classes = useStyles();

  let msghtml = ""

  if (messages.length === 1) {
      msghtml = messages[0]
  } else {
      msghtml = messages.map((message, index) => (
        <Fragment key={index}>
            <span>- {message}</span>
            <br></br>
        </Fragment>
      ))
  }

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert severity={severity} onClose={handleClose}>
            {msghtml}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Notification;