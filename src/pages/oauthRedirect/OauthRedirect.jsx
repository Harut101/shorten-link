import { useEffect } from "react";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";
import { parseSearchParams } from "../../helpers/parsers";
import { getAccessToken } from "../../api/bitlyApi";
import { authorize } from "../../store/reducers/authReducer";
import { useDispatch } from "react-redux";

const getToken = getAccessToken();

function OauthRedirect() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function get() {
      const { code } = parseSearchParams(location.search.slice(1));

      if (code) {
        try {
          const response = await getToken.call(code);
          const { access_token, login } = parseSearchParams(response);

          localStorage.setItem("access_token", access_token);
          localStorage.setItem("login", login);
          dispatch(authorize());
          navigate("/dashboard");
        } catch (e) {
          navigate("/sign-in");
        }
      }
    }

    location?.search && get();

    return () => {
      getToken.cancel();
    };
  }, [location, dispatch, navigate]);

  return <Box>AAAAA</Box>;
}

export default OauthRedirect;
