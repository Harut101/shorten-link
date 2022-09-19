import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("access_token"));
  }, []);

  return isAuth;
};

export default useAuth;
