import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { parseSearchParams } from "../../helpers/parsers";
import { getAccessToken } from "../../api/bitlyApi";

const getToken = getAccessToken();

function OauthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function get() {
      const { code } = parseSearchParams(location.search.slice(1));

      if (code) {
        try {
          const response = await getToken.call(code);
          const { access_token, login } = parseSearchParams(response);

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("login", login);
          navigate("/link-editor");
        } catch (e) {
          navigate("/sign-in");
        }
      }
    }

    location?.search && get();

    return () => {
      getToken.cancel();
    };
  }, [location, navigate]);

  return <Box>AAAAA</Box>;
}

export default OauthRedirect;
