import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from "yup";
import axios from "axios";
import { withFormik } from 'formik';
import listServerErrors from '../../global/functions/listServerErrors';

function CreateGuestForm(props) {

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    open
  } = props;

  return (
    <div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choix du pseudo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Veuillez choisir le pseudo que vous utiliserez dans ce salon.
          </DialogContentText>
          <TextField
                    id="username"
                    label="Pseudo"
                    type="text"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username ? errors.username : ""}
                    error={touched.username && Boolean(errors.username)}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    autoFocus
                    required
                />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const CreateGuest = withFormik({
  mapPropsToValues: ({
      username
  }) => {
      return {
          username: username || ""
      };
  },

  validationSchema: Yup.object().shape({
      username: Yup.string()
          .required("Entrez un pseudo")
  }),

  handleSubmit: async (values, { props, resetForm }) => {

      const { roomCode, openNotif, closeForm, setcurrentUsername } = props;
      const guest = {...values, roomCode: roomCode}
      const guestjson = JSON.stringify(guest);

      try {
        // create guest user
        await axios.post(
          "http://localhost:8081/api/guests",
          guestjson,
          { headers: { 'Content-Type': 'application/json' } }
        )

        // Clean form
        resetForm();
        // Show welcome notif
        openNotif(`Bienvenue ${guest.username}, vous pouvez maintenant envoyer vos messages dans ce salon`, "success")
        // close choose username form
        closeForm();
        // Set current user id
        setcurrentUsername(guest.username);
      } catch(e) {           
        // Show errors in notif
        const errorList = listServerErrors(e.response.status, e.response.data)
        openNotif(errorList, "error")
      }
    }
})(CreateGuestForm);

export default CreateGuest;