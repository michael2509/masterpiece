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
import Grid from '@material-ui/core/Grid';
import { KeyboardDateTimePicker } from '@material-ui/pickers';
import { withFormik } from "formik";
import * as Yup from "yup";
import { addDays, differenceInMinutes } from 'date-fns';
import { isValid } from 'date-fns/esm';

const useStyles = makeStyles(theme => ({
    eventNameInput: {
        marginBottom: theme.spacing(4)
    },
    datePicker: {
        width: 200,
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

const AddEventChild = (props) => {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue
    } = props;        

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
        

    return (
        <div>
        <Fab onClick={handleClickOpen} className={classes.fab} color="primary" aria-label="add" variant="extended">
            <AddIcon className={classes.extendedIcon} />
            Créer un événement
        </Fab>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit} noValidate>
                <DialogTitle id="form-dialog-title">Créer un nouvel événement</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Créer un nouvel espace dédié à votre événement, vous permettant de récupérer les questions des participants, et de leur soumettre des sondages et quiz.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom de l'événement"
                        type="text"
                        fullWidth
                        className={classes.eventNameInput}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                    />
                    <Grid container justify="space-around">
                        <KeyboardDateTimePicker
                            id="startDate"
                            variant="inline"
                            ampm={false}
                            label="Début de l'événement"
                            value={values.startDate}
                            onChange={value => setFieldValue("startDate", value)}
                            disablePast
                            format="dd/MM/yyyy HH:mm"
                            className={classes.datePicker}
                            onBlur={handleBlur}
                            helperText={Boolean(errors.startDate) ? errors.startDate : ""}
                            error={Boolean(errors.startDate) ? true : false}
                        />
                        <KeyboardDateTimePicker
                            id="endDate"
                            variant="inline"
                            ampm={false}
                            label="Fin de l'événement"
                            value={values.endDate}
                            onChange={value => setFieldValue("endDate", value)}
                            disablePast
                            format="dd/MM/yyyy HH:mm"
                            className={classes.datePicker}
                            minDate={values.startDate}
                            onBlur={handleBlur}
                            helperText={Boolean(errors.endDate) ? errors.endDate : ""}
                            error={Boolean(errors.endDate) ? true : false}
                        />
                    </Grid>
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

const AddEvent = withFormik({
    mapPropsToValues: ({
        name,
        startDate,
        endDate
    }) => ({
        name: name || "",
        startDate: startDate || new Date(),
        endDate: endDate || addDays(new Date(), 1)
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string()
                .max(255, "Le nom de l'événement ne peut pas excéder 255 caractères")
                .required("Veuillez entrer un nom pour l'événement"),
        startDate: Yup.mixed()
                    .test("null start date", "Veuillez entrez une date",
                        function (startDate) {
                            return startDate === null ? false : true
                    })
                    .test("start date not in past", "Ne peut pas être dans le passé",
                        function (startDate) {                            
                            return isValid(startDate) && differenceInMinutes(startDate, new Date()) < 0 ? false : true
                    })
                    .test("start date before end date", "Doit être avant la fin de l'événement", 
                        function(startDate) {
                            const { endDate } = this.parent                             
                            
                            return (isValid(startDate) && isValid(endDate) && differenceInMinutes(startDate, endDate) >= 0) ? false : true
                    })
                    .test("invalid start date format", "Format invalide, le format de la date doit être : dd/MM/yy HH:mm",
                        function (startDate) {
                            return isValid(startDate) ? true : false
                    }),
        endDate: Yup.mixed()
                    .test("null end date", "Veuillez entrez une date",
                        function (endDate) {
                            return endDate === null ? false : true
                    })
                    .test("start date before end date", "Doit être après le début l'événement", 
                        function(endDate) {
                            const { startDate } = this.parent
                            return (isValid(endDate) && isValid(startDate) && differenceInMinutes(endDate, startDate) <= 0) ? false : true
                    })
                    .test("invalid start date format", "Format invalide, le format de la date doit être : dd/MM/yy HH:mm",
                        function (endDate) {
                            return isValid(endDate) ? true : false
                    }),
    }),
    handleSubmit: () => {
        console.log("form submitted");
    }
})(AddEventChild)

export default AddEvent;