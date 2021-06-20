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
            Veuillez choisir le pseudo que vous utiliserez dans ce chat.
          </DialogContentText>
          <TextField
                    id="pseudo"
                    label="Pseudo"
                    type="text"
                    value={values.pseudo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.pseudo ? errors.pseudo : ""}
                    error={touched.pseudo && Boolean(errors.pseudo)}
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
      pseudo
  }) => {
      return {
          pseudo: pseudo || ""
      };
  },

  validationSchema: Yup.object().shape({
      pseudo: Yup.string()
          .required("Entrez un pseudo")
  }),

  handleSubmit: async (values, { props, resetForm }) => {

      const { chatId, openNotif, closeForm, setSenderName, setSenderType } = props;
      const guest = {...values, chatId: chatId}
      const guestjson = JSON.stringify(guest);

      console.log(guest);

      try {
        // create guest user
        await axios.post(
          "/api/guests",
          guestjson,
          { headers: { 'Content-Type': 'application/json' } }
        )

        // Clean form
        resetForm();
        // Show welcome notif
        openNotif(`Bienvenue ${guest.pseudo}, vous pouvez maintenant envoyer vos messages dans ce chat`, "success")
        // close choose pseudo form
        closeForm();
        // Set guest peudo in redux state
        setSenderName(guest.pseudo);
        setSenderType("guest")
      } catch(e) {           
        // Show errors in notif
        const errorList = listServerErrors(e.response.status, e.response.data)
        openNotif(errorList, "error")
      }
    }
})(CreateGuestForm);

export default CreateGuest;