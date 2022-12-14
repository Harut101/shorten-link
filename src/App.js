import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Header from "./components/header/Header";
import useAppStyles from "./styles/app-styles";
import Pages from "./pages";
import { getUserApi } from "./api/userApi";
import { authorize } from "./store/reducers/userReducer";
import "./App.css";

const getUser = getUserApi();

function App() {
  const classes = useAppStyles();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function get() {
      try {
        const response = await getUser.call();
        response?.data && dispatch(authorize(response.data));
      } catch (e) {
        console.log(e);
      }
    }

    !user.loggedIn && get();

    return () => getUser.cancel();
  }, [user, dispatch]);

  return (
    <div className={classes.app}>
      <Header isAuth={user.loggedIn} />
      <Container className={classes.container}>
        <Pages />
      </Container>
    </div>
  );
}

export default App;
