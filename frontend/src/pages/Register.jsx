import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import api from "../services/api";

const Register = () =>
{
  const [formData, setFormData] = useState({name : "",email : "", password : ""});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) =>
  {
    const {name, value} = event.target;

    setFormData((previousData) => ({...previousData, [name] : value}));
  };

  const handleSubmit = async (event) =>
  {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try 
    {
      const response = await api.post("/auth/register",formData);
      setSuccess(response.data.message);

      setTimeout(() =>
      {
        navigate("/login");
      },1000);
    } 
    catch (error) 
    {
      setError(error.response?.data?.message || "Resgistration failed. Please try agian.");
    }

    finally
    {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-card" onSubmit={handleSubmit}>

        <h1>Create Account</h1>
        <p className="auth-subtitle">Create your SupportDesk account</p>

        {error && (<div className="error-message">{error}</div>)}

        {success && (<div className="success-message">{success}</div>)}

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id = "name" name = "name" type = "text" placeholder="Enter your name"
          value={formData.name} onChange={handleChange} required/>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id = "email" name = "email" type = "email" placeholder="Enter your email"
          value={formData.email} onChange={handleChange} required/>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id = "password" name = "password" type = "password" placeholder="Minimum 6 characters"
          value={formData.password} onChange={handleChange} minLength="6" required/>
        </div>

        <button className="primary-button" type="submit" disabled = {loading}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="auth-footer">
          Already have na account ? {" "}
          <Link to = "/login">Login</Link>
        </p>

      </form>
    </div>
  );
};

export default Register;