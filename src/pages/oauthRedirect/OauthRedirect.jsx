import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { parseSearchParams } from "../../helpers/parsers";
import { authorize } from "../../api/bitlyApi";
import Typography from "@mui/material/Typography";
import useRedirectStyles from "../../styles/redirect-styles";
import LinearProgress from "@mui/material/LinearProgress";

const auth = authorize();

function OauthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  const { redirect, redirectBlock, redirectTitle } = useRedirectStyles();

  useEffect(() => {
    async function get() {
      const { code } = parseSearchParams(location.search.slice(1));

      if (code) {
        try {
          const response = await auth.call();
          console.log(response);
          localStorage.setItem("access_token", response.access_token);
          navigate("/");
        } catch (e) {
          if (e?.message !== "canceled") {
            navigate("/sign-in");
          }
        }
      }
    }

    location?.search && get();

    return () => {
      auth.cancel();
    };
  }, [location, navigate]);

  return (
    <Box className={redirect}>
      <Box className={redirectBlock}>
        <Typography
          variant="p"
          component="p"
          color="primary"
          className={redirectTitle}
        >
          Please wait we authorizing your account
        </Typography>
        <LinearProgress sx={{ width: "100%" }} />
      </Box>
    </Box>
  );
}

export default OauthRedirect;
