import { makeStyles } from "@material-ui/core/styles";

const useAppStyles = makeStyles((theme) => ({
  app: {
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    boxSizing: "border-box",
    margin: "0 auto",
    backgroundColor: "#e5e5e5",
  },

  appBody: {
    padding: "20px 10px",

    [theme.breakpoints.up("md")]: {
      padding: "20px 20px",
    },
  },
}));

export default useAppStyles;
