import { useEffect } from "react";
import Box from "@mui/material/Box";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function LinkEditor() {
  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  return <Box>LinkEditor</Box>;
}

export default LinkEditor;
