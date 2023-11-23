import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
    updateAuthStatus(storedUser);
  }, [])

  const updateAuthStatus = (storedUser) => {
    if (!storedUser || (Date.now() > storedUser.data.exp * 1000)) {
      userLogout();
      setIsAuthenticated(false);
  } else {
    setIsAuthenticated(true);
  }
  }
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  }

  // const userIsAuthenticated = () => {
  //   let storedUser = localStorage.getItem("user");
  //   if (!storedUser) {
  //     userLogout();
  //     return false;
  //   }
  //   storedUser = JSON.parse(storedUser);
  //   console.log(storedUser)

  //   if (Date.now() > storedUser.data.exp * 1000) {
  //     userLogout();
  //     return false;
  //   }
  //   return true;
    
  // }

  const userLogin = user => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    updateAuthStatus(user);
    console.log(user)
  }

  const userLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  }

  const authContextValue = {
    user,
    getUser,
    isAuthenticated,
    updateAuthStatus,
    userLogin,
    userLogout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

export function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider }