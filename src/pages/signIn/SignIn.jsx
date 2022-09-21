import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import useSignInStyles from "./signin-styles";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import fieldValidators from "../../helpers/fieldValidators";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authorizeApi } from "../../api/bitlyApi";
import { getUserApi } from "../../api/userApi";
import { authorize } from "../../store/reducers/userReducer";
import Alert from "../../components/alert/Alert";

const auth = authorizeApi();
const getUser = getUserApi();
const { required, email } = fieldValidators;

function SignIn() {
  const classes = useSignInStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  useAuth(true, "/");

  const { register, errors, onSubmit } = useForm(formSchema, logIn);

  async function logIn(formFields) {
    try {
      setLoading(true);
      const { email, password } = formFields;
      await auth.call(email, password);
      const { data: userData } = await getUser.call();
      dispatch(authorize(userData));
      navigate("/");
    } catch (e) {
      console.log(e);
      setLoading(false);
      e?.message && setError({ message: e.message });
    }
  }

  return (
    <Box className={classes.signIn}>
      <Box className={classes.block}>
        <Typography variant="p" component="p" className={classes.title}>
          Sign in Bitly
        </Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className={classes.field}
          sx={{ marginBottom: "30px" }}
          error={!!errors.email}
          helperText={errors.email}
          {...register("email")}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          className={classes.field}
          error={!!errors.password}
          helperText={errors.password}
          {...register("password")}
        />

        <LoadingButton
          loading={loading}
          className={classes.button}
          variant="contained"
          onClick={onSubmit}
        >
          Sign in
        </LoadingButton>
      </Box>
      <Alert
        open={!!error.message}
        message={error.message}
        type="error"
        onClose={() => setError({})}
      />
    </Box>
  );
}

const formSchema = {
  initialValues: {
    email: "",
    password: "",
  },

  validators: {
    email: [required(), email("invalid email")],
    password: [required()],
  },
};

export default SignIn;
