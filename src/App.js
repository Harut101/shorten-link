import { useEffect } from "react";
import Header from "./components/header/Header";
import Container from "@mui/material/Container";
import useAppStyles from "./styles/app-styles";
import Pages from "./pages";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const { app, appBody } = useAppStyles();
  const navigate = useNavigate();
  const isAuth = useAuth();

  useEffect(() => {
    if (isAuth) {
      navigate("/link-editor");
    } else {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  return (
    <div className={app}>
      <Header isAuth={isAuth} />
      <Container className={appBody}>
        <Pages />
      </Container>
    </div>
  );
}

export default App;
