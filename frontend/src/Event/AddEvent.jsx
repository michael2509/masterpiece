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
import DateFnsUtils from "@date-io/date-fns";
import {  MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';

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

export default function AddEvent() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedStartDate, handleStartDateChange] = React.useState(new Date());
    const [selectedEndDate, handleEndDateChange] = React.useState(new Date());

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
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDateTimePicker
                        variant="inline"
                        ampm={false}
                        label="Début de l'événement"
                        value={selectedStartDate}
                        onChange={handleStartDateChange}
                        onError={console.log}
                        disablePast
                        format="dd/MM/yyyy HH:mm"
                        className={classes.datePicker}
                    />
                    <KeyboardDateTimePicker
                        variant="inline"
                        ampm={false}
                        label="Fin de l'événement"
                        value={selectedEndDate}
                        onChange={handleEndDateChange}
                        onError={console.log}
                        disablePast
                        format="dd/MM/yyyy HH:mm"
                        className={classes.datePicker}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Annuler
            </Button>
            <Button onClick={handleClose} color="primary">
                Créer
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}