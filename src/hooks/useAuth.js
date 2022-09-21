import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = (comparableOperand, redirection) => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("access_token"));
  }, []);

  useEffect(() => {
    if (isAuth === comparableOperand) {
      navigate(redirection);
    }
  }, [isAuth, comparableOperand, redirection, navigate]);
};

export default useAuth;
