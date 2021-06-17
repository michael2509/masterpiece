import { makeStyles } from '@material-ui/core/styles';

// Styles for notification component
const notificationStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

export default notificationStyles;