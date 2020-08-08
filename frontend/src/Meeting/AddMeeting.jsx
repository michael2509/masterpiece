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
import { addDays, differenceInMinutes, endOfMinute } from 'date-fns';
import { isValid } from 'date-fns/esm';

const useStyles = makeStyles(theme => ({
    meetingNameInput: {
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

const AddMeetingForm = (props) => {

    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
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
            Créer un Meeting
        </Fab>
        <Dialog open={isSubmitting ? false : open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick>
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">Créer un nouveau meeting</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Créer un nouvel espace, vous permettant de communiquer avec vos invités, et de leur soumettre des sondages et quiz.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom du meeting"
                        type="text"
                        fullWidth
                        className={classes.meetingNameInput}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                        variant="outlined"
                    />
                    <Grid container justify="space-around">
                        <KeyboardDateTimePicker
                            id="startDateTime"
                            variant="inline"
                            ampm={false}
                            label="Début du meeting"
                            value={values.startDateTime}
                            onChange={value => setFieldValue("startDateTime", value)}
                            disablePast
                            format="dd/MM/yyyy HH:mm"
                            className={classes.datePicker}
                            onBlur={handleBlur}
                            helperText={Boolean(errors.startDateTime) ? errors.startDateTime : ""}
                            error={Boolean(errors.startDateTime) ? true : false}
                            inputVariant="outlined"
                            minDate={endOfMinute(new Date())}
                        />
                        <KeyboardDateTimePicker
                            id="endDateTime"
                            variant="inline"
                            ampm={false}
                            label="Fin du meeting"
                            value={values.endDateTime}
                            onChange={value => setFieldValue("endDateTime", value)}
                            disablePast
                            format="dd/MM/yyyy HH:mm"
                            className={classes.datePicker}
                            minDate={values.startDateTime}
                            onBlur={handleBlur}
                            helperText={Boolean(errors.endDateTime) ? errors.endDateTime : ""}
                            error={Boolean(errors.endDateTime) ? true : false}
                            inputVariant="outlined"
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

const AddMeeting = withFormik({
    mapPropsToValues: ({
        name,
        startDateTime,
        endDateTime
    }) => ({
        name: name || "",
        startDateTime: startDateTime || endOfMinute(new Date()),
        endDateTime: endDateTime || endOfMinute(addDays(new Date(), 1))
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string()
                .max(255, "Le nom du meeting ne peut pas excéder 255 caractères")
                .required("Veuillez entrer un nom pour le meeting"),
        startDateTime: Yup.mixed()
                    .test("null start date", "Veuillez entrez une date",
                        function (startDateTime) {
                            return startDateTime === null ? false : true
                    })
                    .test("start date not in past", "Ne peut pas être dans le passé",
                        function (startDateTime) {
                            return isValid(startDateTime) && differenceInMinutes(startDateTime, new Date()) < 0 ? false : true
                    })
                    .test("start date before end date", "Doit être avant la fin du meeting", 
                        function(startDateTime) {
                            const { endDateTime } = this.parent                             
                            
                            return (isValid(startDateTime) && isValid(endDateTime) && differenceInMinutes(startDateTime, endDateTime) >= 0) ? false : true
                    })
                    .test("invalid start date format", "Format invalide, le format de la date doit être : dd/MM/yy HH:mm",
                        function (startDateTime) {
                            return isValid(startDateTime) ? true : false
                    }),
        endDateTime: Yup.mixed()
                    .test("null end date", "Veuillez entrez une date",
                        function (endDateTime) {
                            return endDateTime === null ? false : true
                    })
                    .test("start date before end date", "Doit être après le début l'meeting", 
                        function(endDateTime) {
                            const { startDateTime } = this.parent
                            return (isValid(endDateTime) && isValid(startDateTime) && differenceInMinutes(endDateTime, startDateTime) <= 0) ? false : true
                    })
                    .test("invalid start date format", "Format invalide, le format de la date doit être : dd/MM/yy HH:mm",
                        function (endDateTime) {
                            return isValid(endDateTime) ? true : false
                    }),
    }),
    handleSubmit: (values, { props, resetForm, setSubmitting }) => {
        const meeting = {...values};
        const { createMeeting, getMeetingListPage, currentPage } = props;
        
        createMeeting(meeting).then(reqSuccess => {
            if (reqSuccess) {
                resetForm();
                setSubmitting(true);
                getMeetingListPage(currentPage);
            } else {
                setSubmitting(false);
            }
        })
    }
})(AddMeetingForm)

export default AddMeeting;