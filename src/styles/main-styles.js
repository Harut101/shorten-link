import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appClass: {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    boxSizing: "border-box",
    margin: "0 auto",
    backgroundColor: "#e5e5e5",
  },

  bodyClass: {
    padding: "20px 10px",

    [theme.breakpoints.up("md")]: {
      padding: "20px 20px",
    },
  },
}));

export default useStyles;
