import Header from "./components/header/Header";
import Container from "@mui/material/Container";
import useStyles from "./styles/main-styles";
import "./App.css";

function App() {
  const { appClass, bodyClass } = useStyles();

  return (
    <div className={appClass}>
      <Header />
      <Container className={bodyClass}>Body</Container>
    </div>
  );
}

export default App;
