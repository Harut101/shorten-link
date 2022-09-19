import { useEffect } from "react";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
//import { getLinks } from "../../api/bitlyApi";

//const getBitlinks = getLinks();

function LinkEditor() {
  const navigate = useNavigate();
  const isAuth = useAuth();

  // useEffect(() => {
  //   async function get() {
  //     let response = await getBitlinks.call();

  //     console.log(response);
  //   }

  //   get();

  //   return () => {
  //     getBitlinks.cancel();
  //   };
  // }, []);

  useEffect(() => {
    if (isAuth === false) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  return <Box>LinkEditor</Box>;
}

export default LinkEditor;
