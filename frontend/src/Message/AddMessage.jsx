import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    roomNameInput: {
        marginBottom: theme.spacing(4)
    },
    datePicker: {
        width: 250,
        marginBottom: theme.spacing(2)
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
        textTransform: 'none'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    }
}));

const AddMessageForm = (props) => {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setSubmitting
    } = props;        

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setSubmitting(false);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
        
    return (
        <div>
        <Fab onClick={handleClickOpen} className={classes.fab} color="primary" aria-label="add" variant="extended">
            <AddIcon className={classes.extendedIcon} />
            Nouveau message
        </Fab>
        <Dialog open={isSubmitting ? false : open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Envoyer un nouveau message</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="author"
                        label="Votre pseudo"
                        type="text"
                        fullWidth
                        className={classes.roomNameInput}
                        value={values.author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.author ? errors.author : ""}
                        error={touched.author && Boolean(errors.author)}
                        variant="outlined"
                    />
                    <TextField
                        id="message"
                        label="Votre message"
                        type="text"
                        fullWidth
                        className={classes.roomNameInput}
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.message ? errors.message : ""}
                        error={touched.message && Boolean(errors.message)}
                        variant="outlined"
                        multiline
                        rows={4}
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                <Button color="primary" onClick={handleClose} variant="outlined">
                    Annuler
                </Button>
                <Button type="submit" color="primary" variant="contained">
                    Créer
                </Button>
                </DialogActions>
            </form>
        </Dialog>
        </div>
    );
}

const AddMessage = withFormik({
    mapPropsToValues: ({
        author,
        message
    }) => ({
        author: author || "",
        message: message || ""
    }),

    validationSchema: Yup.object().shape({
        author: Yup.string()
            .max(120, "Votre pseudo ne peut pas excéder 120 caractères")
            .required("Entrez votre pseudo"),
        message: Yup.string()
            .max(255, "Votre message ne peut pas excéder 255 caractères")
            .required("Entrez votre message")
    }),
    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        const { sendMessage, clientRef, match } = props;
        const roomCode = match.params.code
        console.log(roomCode);

        const message = { ...values, roomCode };

        sendMessage(message, clientRef);
        resetForm();
        setSubmitting(true)
    }
})(AddMessageForm)

export default withRouter(AddMessage);