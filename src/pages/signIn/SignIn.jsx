import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useSignInStyles from "./signin-styles";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import fieldValidators from "../../helpers/fieldValidators";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authorizeApi } from "../../api/bitlyApi";
import { getUserApi } from "../../api/userApi";
import { authorize } from "../../store/reducers/userReducer";

const auth = authorizeApi();
const getUser = getUserApi();
const { required } = fieldValidators;

function SignIn() {
  const classes = useSignInStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useAuth();

  const { register, errors, onSubmit } = useForm(formSchema, logIn);

  useEffect(() => {
    if (isAuth === true) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  async function logIn(formFields) {
    try {
      const { email, password } = formFields;
      await auth.call(email, password);
      const { data: userData } = await getUser.call();
      dispatch(authorize(userData));
      navigate("/");
    } catch (e) {
      console.log(e);
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
          className={classes.field}
          error={!!errors.password}
          helperText={errors.password}
          {...register("password")}
        />

        <Button className={classes.button} variant="contained" onClick={onSubmit}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}

const formSchema = {
  initialValues: {
    email: "",
    password: "",
  },

  validators: {
    email: [required()],
    password: [required()],
  },
};

export default SignIn;
