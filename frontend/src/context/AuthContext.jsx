// createContext -> create global context, useContext -> access context, useState -> store logged-in user
import { createContext, useContext, useState } from "react";

//createContext instance
const AuthContext = createContext();

//AuthProvider wraps our application
//anything inside it can access authentication information.
//ex. Navbar, Login, Dashboard, Tickets etc.
export const AuthProvider = ({children}) =>
{
  //storing currently logged in user
  const [user, setUser] = useState(() =>
  {
    //saving user in localstorage bcz if browser refreshes state disapperees.
    const savedUser = localStorage.getItem("user");

    //converting JSON into Object
    // bcz localstorage stores strings so here we converting it into object
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //Login function
  const login = (userData, token) =>
  {
    //storing token
    localStorage.setItem("token",token);

    //storing user
    //bcz localstorage only stores strings here we sre using JSON.stringify()
    localStorage.setItem("user", JSON.stringify(userData));

    //updating state now entire app knows the user logged in.
    setUser(userData);
  };

  //logout function
  const logout = () =>
  {
    //Removing token
    localStorage.removeItem("token");

    //Removing user
    localStorage.removeItem("user");

    //Reset state
    setUser(null);
  };

  return (
    //Proving value globally
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

//custom Hook 
// this allows components to do const {user, logout} = UseAuth();
export const UseAuth = () =>
{
  return useContext(AuthContext);
};