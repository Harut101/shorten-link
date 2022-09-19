import { makeStyles } from "@material-ui/core/styles";

const useRedirectStyles = makeStyles((theme) => ({
  redirect: {
    width: "100%",
    marginTop: "60px",
    display: "flex",
    justifyContent: "center",
  },

  redirectBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100px",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
    padding: "30px",
    background: theme.palette.common.white,
  },

  redirectTitle: {
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
}));

export default useRedirectStyles;
