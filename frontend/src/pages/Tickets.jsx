import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

import api from "../services/api";
import {UseAuth} from "../context/AuthContext";

import TicketCard from "../components/TicketCard";

const Tickets = () =>
{
  const {user} = UseAuth();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () =>
  {
    try 
    {
      setLoading(true);
      setError("");

      //query paramers this creates an object. if user choose open then status=open
      //axios api.get("tickets",{params}); automatically generates /api/tickets?status=open
      //the request becomes approximately /api/tickets?status=open&priority=high&category=payment
      const params = {};

      if(search.trim())
      {
        params.search = search.trim();
      }

      if(status)
      {
        params.status = status;
      }

      if(priority)
      {
        params.priority = priority;
      }

      if(category)
      {
        params.category = category;
      }

      const response = await api.get("/tickets",{params});
      setTickets(response.data.tickets);
    } 
    catch (error) 
    {
      setError(error.response?.data?.message || "Failed to load tickets");
    }

    finally
    {
      setLoading(false);
    }
  };

  useEffect(() =>
  {
    fetchTickets();
    
  },[status, priority, category]);

  const handleSearch = (event) =>
  {
    event.preventDefault();
    fetchTickets();
  };

  const handleDelete = async (ticketId) =>
  {
    const confirmed = window.confirm("Are you sure you want to delete this tickets ?");

    if(!confirmed)
    {
      return;
    }

    try 
    {
      await api.delete(`/tickets/${ticketId}`);

      setTickets((previousTickets) => previousTickets.filter((ticket) => ticket._id !== ticketId));
    } 
    catch (error) 
    {
      setError(error.response?.data?.message || "failed to delete ticket.");
    }
  };

  const clearFilters = () =>
  {
    setSearch("");
    setStatus("");
    setPriority("");
    setCategory("");
  };

  return (
    <div className="page-container">
      <div className="page-header">

        <div>
          <h1>{user.role === "admin" ? "All Tickets" : "My Tickets"}</h1>
          <p>Manage and track support requests.</p>
        </div>

        <Link to = "/tickets/create" className="primary-button">+ Create Ticket</Link>

      </div>

      <div className="filter-card">

        <form className="filter-form" onSubmit={handleSearch}>

          <div className="form-group search-group">
            <label htmlFor="search">Search</label>
            <input id = "search" type="text" placeholder="Search title or description..."
            value={search} onChange={(event) => setSearch(event.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id = "status" value={status} onChange={(event) => setStatus(event.target.value)}>

              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>

            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id = "priority" value={priority} 
            onChange={(event) => setPriority(event.target.value)}>

              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="in-progress">In Progress</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>

            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id = "category" value={category} 
            onChange={(event) => setCategory(event.target.value)}>

              <option value="">All Category</option>
              <option value="technical">Technical</option>
              <option value="payment">Payment</option>
              <option value="account">Account</option>
              <option value="general">General</option>

            </select>
          </div>

          <button type="submit" className="primary-button">Search</button>
          <button type="bytton" className="secondary-button" onClick={clearFilters}>
            Clear
          </button>

        </form>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      {loading ? (
        <div className="loading">Loading tickets...</div>
      ): tickets.length === 0 ? (
      <div className="empty-state">
        <h3>No tickets found</h3>
        <p>Try changing your search or fillters.</p>
      </div>):(
        <div className="tickets-grid">
          {tickets.map((ticket)=>(
            <TicketCard key={ticket} ticket={ticket} onDelete={handleDelete} 
            isAdmin={user.role === "admin"}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tickets;