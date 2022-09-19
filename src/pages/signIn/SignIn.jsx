import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useSignInStyles from "../../styles/signin-styles";
import Button from "@mui/material/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { signIn, signInBlock, signInTitle, signInButton } = useSignInStyles();
  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth === true) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  function redirectToBitly() {
    window.location = `${process.env.REACT_APP_BITLY_AUTHORIZE_URL}?client_id=${process.env.REACT_APP_BITLY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
  }

  return (
    <Box className={signIn}>
      <Box className={signInBlock}>
        <Typography variant="p" component="p" className={signInTitle}>
          Sign in with Bitly
        </Typography>

        <Button className={signInButton} variant="contained" onClick={redirectToBitly}>
          Sign in
        </Button>
      </Box>
    </Box>
  );
}

export default SignIn;
