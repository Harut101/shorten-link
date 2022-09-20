import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useForm from "../../../../hooks/useForm";
import fieldValidators from "../../../../helpers/fieldValidators";

const { required } = fieldValidators;

function CreateModal({ open, onClose, onCreate }) {
  const { register, errors, onSubmit } = useForm(formSchema, onCreate);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: "bold" }}>
        Short link
      </DialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%" }}>
          <TextField
            id="outlined-basic"
            label="Url"
            variant="outlined"
            sx={{ width: "100%" }}
            error={!!errors.url}
            helperText={errors.url}
            {...register("url")}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: "20px" }}>
        <Button onClick={onClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={onSubmit} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const formSchema = {
  initialValues: {
    url: "",
  },

  validators: {
    url: [required()],
  },
};

export default CreateModal;
