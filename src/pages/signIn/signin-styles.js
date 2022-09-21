import { makeStyles } from "@material-ui/core/styles";

const useSignInStyles = makeStyles((theme) => ({
  signIn: {
    width: "100%",
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
  },

 block: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
    padding: "40px",
    background: theme.palette.common.white,

    [theme.breakpoints.down("sm")]: {
      padding: "40px 20px",
    },
  },

 title: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: "20px",
    marginBottom: "30px !important",
    color: theme.palette.primary.main,
  },

 button: {
    width: "100%",
    maxWidth: "300px",
    marginTop: "30px !important",
    backgroundColor: theme.palette.primary.main,

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },

  field: {
    width: "100%",
    maxWidth: "300px",

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
}));

export default useSignInStyles;
