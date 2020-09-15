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
import { makeStyles } from '@material-ui/core/styles';
import { withFormik } from "formik";
import * as Yup from "yup";

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

const AddRoomForm = (props) => {

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
            Créer un salon
        </Fab>
        <Dialog open={isSubmitting ? false : open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Créer un nouveau salon</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Créer un salon privé, vous permettant de communiquer avec vos invités via un chat, et de leur proposer des sondages et quiz.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom du salon"
                        type="text"
                        fullWidth
                        className={classes.roomNameInput}
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

const AddRoom = withFormik({
    mapPropsToValues: ({
        name
    }) => ({
        name: name || ""
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string()
                .max(255, "Le nom du salon ne peut pas excéder 255 caractères")
                .required("Veuillez entrer un nom pour le salon"),
    }),
    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        const room = {...values};
        const { createRoom, getRoomListPage, pageNumber } = props;
        
        createRoom(room).then(reqSuccess => {
            if (reqSuccess) {
                resetForm();
                setSubmitting(true);
                getRoomListPage(pageNumber);
            } else {
                setSubmitting(false);
            }
        })
    }
})(AddRoomForm)

export default AddRoom;