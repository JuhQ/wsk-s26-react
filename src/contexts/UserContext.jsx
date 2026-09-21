import { createContext, useEffect, useState } from "react";
import { useAuthentication, useUser } from "../hooks/apiHooks";

import { useNavigate } from "react-router";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin, checkToken } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  // login, logout and autologin functions are here instead of components
  const handleLogin = async (credentials) => {
    try {
      // TODO: post login credentials to API
      // TODO: set token to local storage
      // TODO: set user to state
      // TODO: navigate to home
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleLogout = () => {
    try {
      // TODO: remove token from local storage
      localStorage.removeItem("token");
      // TODO: set user to null
      setUser(null);
      // TODO: navigate to home or login page
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  // handleAutoLogin is used when the app is loaded to check if there is a valid token in local storage
  const handleAutoLogin = async () => {
    try {
      // TODO: navigate to home

      const token = localStorage.getItem("token");

      if (token) {
        const loginResult = await checkToken(token);

        setUser(loginResult.user);

        // navigate("/");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    // TODO: should this be called from here?
    handleAutoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, handleLogin, handleLogout, handleAutoLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
