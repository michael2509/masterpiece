import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withFormik } from "formik";
import * as Yup from "yup";
import updateChatStyles from './updateChatStyles';

// Update Chat form component
const UpdateChatForm = (props) => {
    
    const classes = updateChatStyles();

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        state,
        handleClose
    } = props;

    return (
        <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Éditer un chat</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom du chat"
                        type="text"
                        fullWidth
                        className={classes.chatNameInput}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                <Button color="primary" onClick={handleClose} variant="outlined">
                    Annuler
                </Button>
                <Button type="submit" color="primary" variant="contained">
                    Éditer
                </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

// Update chat form component with formik validation
const UpdateChat = withFormik({

    enableReinitialize: true,

    mapPropsToValues: (props) => ({
        name: props.state.chat.name || ""
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string()
                .max(255, "Le nom du chat ne peut pas excéder 255 caractères")
                .required("Veuillez entrer un nom pour le chat"),
    }),
    handleSubmit: (values, { props }) => {
        const { updateChat, state } = props;

        const chat = {
            ...values,
            id: state.chat.id
        }

        updateChat(chat);
    }
})(UpdateChatForm)

export default UpdateChat;