import { useState } from "react";
import {useNavigate} from "react-router-dom";

import api from "../services/api";

const CreateTicket = () =>
{
  //sending title, description, category, priority from frontend not sending createBy bcz user
  //could manipulate createdBy backend determines the user from req.user.userId
  const [formData, setFormData] = useState({title : "", description : "", 
  category : "general", priority : "medium"});

  const [error, setError] = useState("");
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
    setLoading(true);

    try 
    {
      await api.post("/tickets",formData);
      navigate("/tickets");
    } 
    catch (error) 
    {
      setError(error.response?.data?.message || "Failed to create ticket.");
    }

    finally
    {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-page">
        <div className="page-header">

          <div>
            <h1>Create Support Ticket</h1>
            <p>Tell us what ptoblem you are facing.</p>
          </div>

        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <form className="ticket-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="title">Ticket Title</label>
            <input id = "title" name = "title" type = "text" placeholder="Example: Payment failed"
            value={formData.title} onChange={handleChange} maxLength="100" required/>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id = "description" name = "description"
            placeholder="Describe your problem in detail..." value={formData.description} 
            onChange={handleChange} rows="7" required/>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>

              <select id = "category" name = "category" value={formData.category} 
              onChange={handleChange}>
                
                <option value="technical">Technical</option>
                <option value="payment">Payment</option>
                <option value="account">Account</option>
                <option value="general">General</option>

              </select>

            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>

              <select id = "priority" name = "priority" value={formData.priority} 
              onChange={handleChange}>
                
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="general">General</option>

              </select>

            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="secondary-button" onClick={() =>navigate("/tickets")}>
              Cancel
            </button>

            <button type="submit" className="primary-button" disabled = {loading}>
              {loading ? "Creating..." : "Create Ticket"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CreateTicket;