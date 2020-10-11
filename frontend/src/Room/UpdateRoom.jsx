import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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

const UpdateRoomForm = (props) => {
    
    const classes = useStyles();

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
                <DialogTitle id="form-dialog-title">Éditer un salon</DialogTitle>
                <DialogContent>
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
                    Éditer
                </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

const UpdateRoom = withFormik({

    enableReinitialize: true,

    mapPropsToValues: (props) => ({
        name: props.state.room.name || ""
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string()
                .max(255, "Le nom du salon ne peut pas excéder 255 caractères")
                .required("Veuillez entrer un nom pour le salon"),
    }),
    handleSubmit: (values, { props }) => {
        const { updateRoom, state } = props;

        const room = {
            ...values,
            id: state.room.id
        }

        updateRoom(room);
    }
})(UpdateRoomForm)

export default UpdateRoom;