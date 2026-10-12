import {Link} from "react-router-dom";

//Receiving props ticket = ticket info, onDelete = delete function, 
// isAdmin = whenther current use is admin
const TicketCard = ({ticket, onDelete, isAdmin}) =>
{
  return (
    <div className="ticket-card">
      <div className="ticket-card-header">

        <div>
          <h3>{ticket.title}</h3>
          <p className="ticket-date">
          Created : {" "} 
          {/* Date formating*/} 
          {/* MongoDB gives us a timestamp & havascript converts it into redable date */}
          {new Date(ticket.createdAt).toLocaleDateString()}
          </p>
        </div>
        
        {/* Dynamic status class. if status is open class becomes status-badge status-open
        and if relolved status-badge status--resolved. This allows css to style different styles.*/}
        <span className={`status-badge status-${ticket.status}`}>{ticket.status}</span>

      </div>

      <p className="ticket-description">{ticket.description}</p>

      <div className="ticket-meta">
        <span>Category : <strong>{ticket.category}</strong></span>
        <span>Priority : {" "}
          <strong className={`priority-${ticket.priority}`}>
            {ticket.priority}
          </strong>
          </span>

      </div>
      
      {/* admin only creator */} {/* Conditional rendering based on role */}
      {/* Normal user created by info hidden, admin created by info show */}
      {isAdmin && ticket.createdBy && (
        <p className="ticket-user">Created by : {" "}</p>
      )}

      <div className="ticket-actions">
        <Link to = {`/tickets/${ticket._id}`} className="secondary-button">
        View Details
        </Link>

        {/* we don't delete directly we tell parent taht user clicked delete parent component
        hadnles API request*/} {/*child parent communication through call back props */}
        <button onClick={()=> onDelete(ticket._id)} className="danger-button">
          Delete
        </button>

      </div>

    </div>
  );
};

export default TicketCard;