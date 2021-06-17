import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from 'react-router-dom';
import addMessageStyles from './addMessageStyles';

// Add message form component
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

    const classes = addMessageStyles();
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
                        id="text"
                        label="text"
                        type="text"
                        fullWidth
                        className={classes.chatNameInput}
                        value={values.text}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.text ? errors.text : ""}
                        error={touched.text && Boolean(errors.text)}
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
                    Envoyer
                </Button>
                </DialogActions>
            </form>
        </Dialog>
        </div>
    );
}

// Add message form component with formik validation
const AddMessage = withFormik({
    mapPropsToValues: ({
        text
    }) => ({
        text: text || ""
    }),

    validationSchema: Yup.object().shape({
        text: Yup.string()
            .max(255, "Le texte de votre message ne peut pas dépasser 255 caractères")
            .required("Le texte de votre message ne peut être vide")
    }),
    handleSubmit: (messageForm, { props, resetForm, setSubmitting }) => {
        // Get sockjs client, chatId, senderName, senderType from props
        const { sockJsClient, chatId, senderName, senderType } = props;
        // Build message obj to be send to the API
        const message = { text: messageForm.text, chatId: chatId, senderName: senderName, senderType: senderType };
        // Use sock js client to send message to API
        sockJsClient.sendMessage('/app/user-all', JSON.stringify(message));
        // Reset form
        resetForm();
        // Close form
        setSubmitting(true);
    }
})(AddMessageForm)

export default withRouter(AddMessage);