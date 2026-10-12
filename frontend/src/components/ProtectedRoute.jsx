//Navigate -> refirects users, Outlet -> renders the protected child route.
import {Navigate, Outlet} from "react-router-dom";

import { UseAuth } from "../context/AuthContext";

const ProtectedRoute = () =>
{
  //getting authentication state
  const {user} = UseAuth();

  //if there is no logged in user
  if(!user)
  {
    //send them to login page
    return <Navigate to="/login" replace />;
  }

  //if user logged in show what requested
  return <Outlet />
};

export default ProtectedRoute;