import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import useSignInStyles from "../../styles/signin-styles";
import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";
import fieldValidators from "../../helpers/fieldValidators";
import { useNavigate } from "react-router-dom";
import { authorizeApi } from "../../api/bitlyApi";
import { getUserApi } from "../../api/userApi";
import { authorize } from "../../store/reducers/userReducer";

const auth = authorizeApi();
const getUser = getUserApi();
const { required } = fieldValidators;

function SignIn() {
  const { signIn, signInBlock, signInTitle, signInButton, field } = useSignInStyles();
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
    <Box className={signIn}>
      <Box className={signInBlock}>
        <Typography variant="p" component="p" className={signInTitle}>
          Sign in Bitly
        </Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className={field}
          sx={{ marginBottom: "30px" }}
          error={!!errors.email}
          helperText={errors.email}
          {...register("email")}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className={field}
          error={!!errors.password}
          helperText={errors.password}
          {...register("password")}
        />

        <Button className={signInButton} variant="contained" onClick={onSubmit}>
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
