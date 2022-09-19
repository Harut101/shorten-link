import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import useSignInStyles from "../../styles/signin-styles";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { authorize } from "../../api/bitlyApi";

const auth = authorize();

function SignIn() {
  const { signIn, signInBlock, signInTitle, signInButton, field } =
    useSignInStyles();
  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth === true) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  async function logIn() {
    try {
      const response = await auth.call();
      localStorage.setItem("access_token", response?.data?.access_token);
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
        />

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          className={field}
        />

        <Button className={signInButton} variant="contained" onClick={logIn}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}

export default SignIn;
