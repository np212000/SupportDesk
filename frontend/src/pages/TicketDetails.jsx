//This page is detailed ticket page
//This will also allow adming to change status.

import { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";

import api from "../services/api";
import {UseAuth} from "../context/AuthContext";

const TicektDetails = () =>
{
  //getting /:id from URL
  const {id} = useParams();
  const {user} = UseAuth();
  const navigate = useNavigate();
  
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(()=>
  {
    const fetchTicekt = async () =>
    {
      try 
      {
        const response = await api.get(`/ticket/${id}`);
        setTicket(response.data.ticket);
        setStatus(response.data.status);
      } 
      catch (error) 
      {
        setError(error.response?.data?.message || "Failed to load ticket");
      }

      finally
      {
        setLoading(false);
      }
    };

    fetchTicekt();
  },[id]);

  const handleStatusUpdate = async () =>
  {
    try 
    {
      setUpdating(true);
      setError("");
      setSuccess("");

      const response = await api.patch(`/tickets/${id}/status`,{status});
      setTicket(response.data.ticket);
      setSuccess("Ticket status updated successfully.");
    } 
    catch (error) 
    {
      setError(error.response?.data?.message || "Failed to update ticket.");
    }

    finally
    {
      setUpdating(false);
    }
  };

  const handleDelete = async () =>
  {
    const confirmed = window.confirm("are you sure you want to delete this ticekt ?");

    if(!confirmed)
    {
      return;
    }

    try 
    {
      await api.delete(`/tickets/${id}`);
      navigate("/tickets");
    } 
    catch (error) 
    {
      setError(error.response?.data?.message || "Failed to delete ticket");
    }
  };

  if(loading)
  {
    return (
      <div className="page-container">
        <div className="loading">Loading ticket...</div>
      </div>
    );
  }

  if(!ticket)
  {
    return (
      <div className="page-container">

        <div className="error-message">{error || "Ticket not found."}</div>
        <Link to = "/tickets" className="secondary-button">Back to Tickets</Link>

      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="details-header">

        <div>
          <Link to = "/tickets" className="back-link">Back to Tickets</Link>
          <h1>{ticket.title}</h1>
          <p>Ticket ID : {ticket._id}</p>
        </div>

        <span className={`status-badge status-${ticket.status}`}>{ticket.status}</span>

      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {success && (
        <div className="success-message">{success}</div>
      )}

      <div className="details-layout">
        <div className="details-main">
          <div className="details-card">

            <h2>Description</h2>
            <p className="details-description">{ticket.description}</p>

          </div>

          <div className="details-card">
            <h2>Ticket Information</h2>

            <div className="details-grid">

              <div>
                <span className="detail-label">Category</span>
                <strong>{ticket.category}</strong>
              </div>

              <div>
                <span className="detail-label">Priority</span>
                <strong className={`priority-${ticket.priority}`}>{ticket.priority}</strong>
              </div>

              <div>
                <span className="detail-label">Created</span>
                <strong>{new Date(ticket.createdAt).toLocaleString()}</strong>
              </div>

              <div>
                <span className="detail-label">Last Updated</span>
                <strong>{new Date(ticket.updatedAt).toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>

        <aside className="details-sidebar">
          <div className="details-card">

            <h2>Created By</h2>
            <p><strong>{ticket.createdBy?.name}</strong></p>
            <p>{ticket.createdBy?.email}</p>
            <p>Role : {ticket.createdBy?.role}</p>

          </div>

          {user.role === "admin" && (
            <div className="details-card">
              <h2>Admin Controls</h2>

              <div className="form-group">
                <label htmlFor="status">Update Status</label>
                <select id = "status" value={status} 
                onChange={(event)=>setStatus(event.target.value)}>

                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>

                </select>

              </div>

              <button className="primary-button full-width" onClick={handleStatusUpdate}
              disabled = {updating}>
                {updating ? "Updating..." : "Update Status"}
              </button>

            </div>
          )}

          <div className="details-card">
            <button className="danger-button full-width" onClick={handleDelete}>
              Delete Ticket
            </button>

          </div>

        </aside>
      </div>
    </div>
  );
};

export default TicektDetails;