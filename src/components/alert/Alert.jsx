import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

const Banner = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Alert({ message, open, type, duration, onClose }) {
  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose}>
      <Banner onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Banner>
    </Snackbar>
  );
}

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  open: PropTypes.bool,
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

Alert.defaultProps = {
  message: "",
  type: "success",
  open: false,
  duration: 6000,
  onClose: () => {},
};

export default Alert;
