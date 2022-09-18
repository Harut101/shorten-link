import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useSignInStyles from "../../styles/signin-styles";
import LoadingButton from "@mui/lab/LoadingButton";

function SignIn() {
  const { signIn, signInBlock, signInTitle, signInButton } = useSignInStyles();
  return (
    <Box className={signIn}>
      <Box className={signInBlock}>
        <Typography variant="p" component="p" className={signInTitle}>
          Sign in with Bitly
        </Typography>

        <LoadingButton className={signInButton} variant="contained">Sign in</LoadingButton>
      </Box>
    </Box>
  );
}

export default SignIn;
