import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { getLinks } from "../../api/bitlyApi";
import { addLinks } from "../../store/reducers/linksReducers";

const getBitlinks = getLinks();

function LinkEditor() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    async function get() {
      let { data } = await getBitlinks.call(user.default_group_guid);
      dispatch(addLinks(data?.links));
    }

    user.loggedIn && get();

    return () => {
      getBitlinks.cancel();
    };
  }, [user.loggedIn, user.default_group_guid, dispatch]);

  return <Box>LinkEditor</Box>;
}

export default LinkEditor;
