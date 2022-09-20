import { makeStyles } from "@material-ui/core/styles";

const useDashboardStyles = makeStyles(() => ({
  dashboard: {
    width: "100%",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  dashboardHeader: {
    width: "100%",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "space-between",
  },

  dashboardTitle: {
    fontWeight: "bold",
    fontSize: "20px",
  },
}));

export default useDashboardStyles;
