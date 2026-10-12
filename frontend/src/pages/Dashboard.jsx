import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import api from "../services/api";
import {UseAuth} from "../context/AuthContext";

const Dashboard = () =>
{
  const {user} = UseAuth();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  //Fetching tickets when dashboard loads
  //Dashboard mounted -> useEffect() -> GET /api/tickets -> MongoDB -> tickets -> setTickets()
  useEffect(()=>
  {
    const fetchTickets = async () =>
    {
      try 
      {
        //API request api.js has /api so final URL become /api/tickets and 
        // Axios interceptor automatically adds : Bearer JWT
        const response = await api.get("/tickets");
        setTickets(response.data.tickets);
      } 
      catch (error) 
      {
        setError(error.response?.data?.message || "Failed to load dashboard");
      }

      finally
      {
        setLoading(false);
      }
    };
    fetchTickets();
  },[]);

  //Statistics dashboard will caculate values directly from API response
  const openTickets = tickets.filter((ticket)=> ticket.status === "open").length;
  const inProgressTickets = tickets.filter((ticket)=> ticket.status === "in-progress").length;
  const resolvedTickets = tickets.filter((ticket)=>ticket.status === "resolved").length;
  const closedTickets = tickets.filter((ticket) => ticket.status === "closed").length;

  if(loading)
  {
    return (
      <div className="page-container">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="dashboard-header">

        <div>
          <h1>Welcome, {user.name} </h1>
          <p>Here's an overview of your support tickets.</p>
        </div>

        <Link to = "/tickets/create" className="primary-button">+ Create Ticket </Link>

      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="starts-grid">
        <div className="stat-card">
          <span>Total Tickets</span>
          <strong className="stat-number">{tickets.length}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Open</span>
          <strong className="stat-number">{openTickets}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <strong className="stat-number">{inProgressTickets}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Resolved</span>
          <strong className="stat-number">{resolvedTickets}</strong>
        </div>

        <div className="stat-card">
          <span className="stat-label">Closed</span>
          <strong className="stat-number">{closedTickets}</strong>
        </div>

      </div>

      <div className="dashboard-section">
        <div className="section-header">

          <div>
            <h2>Recent Tickets</h2>
            <p>Your latest support requests.</p>
          </div>

          <Link to = "/tickets" className="secondary-button">View All</Link>

        </div>

        {tickets.length === 0 ? (
          <div className="empty-state">
            <h3>No tickets yet</h3>
            <p>Create first support ticket to get started.</p>
            <Link to = "/tickets/create" className="primary-button">Create Ticket</Link>

          </div>
        ):(
          <div className="recent-tickets">
            {/* Only first 5 tickets are dispalyed on dashboard 
            complete list will available on /tickets */}
            {tickets.slice(0, 5).map((ticket) =>
            (
              <div className="mini-ticket" key={ticket._id}>
                <div>
                  <h3>{ticket.title}</h3>
                  <p>{ticket.category} . {ticket.priority}</p>
                </div>

                <span className={`status-badge status-${ticket.status}`}>{ticket.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;