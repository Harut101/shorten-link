import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(
      !!(localStorage.getItem("access_token") && localStorage.getItem("login"))
    );
  }, []);

  return isAuth;
};

export default useAuth;
