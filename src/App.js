import Header from "./components/header/Header";
import Container from "@mui/material/Container";
import useAppStyles from "./styles/app-styles";
import Pages from "./pages";
import "./App.css";

function App() {
  const { app, appBody } = useAppStyles();

  return (
    <div className={app}>
      <Header />
      <Container className={appBody}>
        <Pages />
      </Container>
    </div>
  );
}

export default App;
