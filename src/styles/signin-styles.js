import { makeStyles } from "@material-ui/core/styles";

const useSignInStyles = makeStyles((theme) => ({
  signIn: {
    width: "100%",
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
  },

  signInBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "200px",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
    padding: "20px",
    background: theme.palette.common.white,
  },

  signInTitle: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: "20px",
    color: theme.palette.primary.main
  },

  signInButton: {
    width: "100%",
    maxWidth: "300px",
    backgroundColor: theme.palette.primary.main
  }
}));

export default useSignInStyles;
