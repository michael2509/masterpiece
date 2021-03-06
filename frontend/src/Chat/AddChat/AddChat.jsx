import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { withFormik } from "formik";
import * as Yup from "yup";
import addChatStyles from './addChatStyles';

// Add chat form component
const AddChatForm = (props) => {

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

    const classes = addChatStyles();
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
            Créer un chat
        </Fab>
        <Dialog open={isSubmitting ? false : open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Créer un nouveau chat</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Créer un chat, vous permettant de communiquer avec vos invités.
                    </DialogContentText>
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
                    Créer
                </Button>
                </DialogActions>
            </form>
        </Dialog>
        </div>
    );
}

// add chat form component with formik validation
const AddChat = withFormik({
    mapPropsToValues: ({
        name
    }) => ({
        name: name || ""
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string()
                .max(120, "Le nom du chat ne peut pas excéder 120 caractères")
                .required("Veuillez entrer un nom pour le chat"),
    }),
    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        const chat = {...values};
        const { createChat, getChatPage } = props;
        
        createChat(chat).then(reqSuccess => {
            if (reqSuccess) {
                resetForm();
                setSubmitting(true);
                getChatPage(0);
            } else {
                setSubmitting(false);
            }
        })
    }
})(AddChatForm)

export default AddChat;