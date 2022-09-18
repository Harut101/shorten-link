import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { parseSearchParams } from "../../helpers/parsers";
import { getAccessToken } from "../../api/bitlyApi";

const getToken = getAccessToken();

function OauthRedirect() {
  let location = useLocation();

  useEffect(() => {
    async function get() {
        const { code } = parseSearchParams(location.search);

        if (code) {
            const response = await getToken.call(code);

            console.log(response);
        }
    }

    location?.search && get();
    return () => {
      getToken.cancel();
    };
  }, [location]);

  return <Box>AAAAA</Box>;
}

export default OauthRedirect;
