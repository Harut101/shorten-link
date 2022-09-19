import Header from "./components/header/Header";
import Container from "@mui/material/Container";
import useAppStyles from "./styles/app-styles";
import Pages from "./pages";
import useAuth from "./hooks/useAuth";
import "./App.css";

function App() {
  const { app, appBody } = useAppStyles();
  const isAuth = useAuth();

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
