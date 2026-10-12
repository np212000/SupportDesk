import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { UseAuth } from "../context/AuthContext";

const Login = () =>
{
  //state object contains complete form
  const [formData, setFormData] = useState({email : "", password : ""});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {login}  = UseAuth();
  const navigate = useNavigate();

  const handleChange = (event) =>
  {
    //input handler
    const {name, value} = event.target;

    //if user changes email or password then previous user types value + current 
    // value will updated in state
    setFormData((previousData)=> ({...previousData, [name] : value}));
  };

  const handleSubmit = async (event) =>
  {
    //stop page refresh while submitting
    event.preventDefault();
    setError("");
    setLoading(true);

    try 
    {
      //API call with email,password
      const response = await api.post("/auth/login",formData);

      //save authentication
      login(response.data.user, response.data.token);

      //after successfull login navigate to dashboard
      navigate("/");
    } 
    catch (error) 
    {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }

    finally
    {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-card" onSubmit={handleSubmit}>

        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your SupportDesk account</p>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <div className="form-group">

          <label htmlFor="email">Email</label>
          <input id = "email" name = "email" type = "email" placeholder="Enter your email"
          value={formData.email} onChange={handleChange} required/>

        </div>

        <div className="form-group">

          <label htmlFor="password">Password</label>
          <input id = "password" name = "password" type = "password" placeholder="Enter your password"
          value={formData.password} onChange={handleChange} required/>

        </div>

        <button className="primary-button" type="submit" disabled = {loading}>
          {loading ? "Loggin in..." : "Login"}
        </button>

        <p className="auth-footer">
          Don't have an account ? {" "}
          <Link to="/register">Register</Link>
        </p>

      </form>

    </div>
  );
};

export default Login;