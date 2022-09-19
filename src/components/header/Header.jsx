import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import { signOut } from "../../services/account";

function Header({ isAuth }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="p">
            shorten links app
          </Typography>
          {isAuth && (
            <Button color="inherit" onClick={signOut}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

Header.propTypes = {
  isAuth: PropTypes.bool,
};

Header.defaultProps = {
  isAuth: false,
};

export default Header;
