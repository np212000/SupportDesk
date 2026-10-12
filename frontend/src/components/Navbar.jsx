import {Link, useNavigate} from "react-router-dom";

import {UseAuth} from "../context/AuthContext";

const Navbar = () =>
{
  //Getting Authentication data Globally
  const {user,logout} = UseAuth();

  //Naviagation instance
  const navigate = useNavigate();

  const handleLogout = () =>
  {
    //clears Authentication
    logout();

    //Redirect after logout
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brnad">SupportDesk</Link>

      {/*Condition rendering if user is not null show navigation & 
      if user null then don't show dashboard*/}
      {user && (
        <div className="navbar-links">

          <Link to = "/">Dashboard</Link>
          <Link to = "/tickets">Tickets</Link>
          <Link to = "/tickets/create">Create Ticket</Link>

          <span className="navbar-button">{user.name} ({user.role})</span>

          <button className="logout-button" onClick={handleLogout}>Logout</button>

        </div>
      )}

    </nav>
  );
};

export default Navbar;