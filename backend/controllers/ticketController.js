import Ticket from "../models/Ticket.js";

//this controller is all about CRUD operations for tickets and fillter,owenership of tickets and addmin access.

//Create a new ticket. POST/api/tickets
export const createTicket = async (req,res) =>
{
  try
  {
    //get data from frontend.
    const {title, description, category, priority} = req.body;

    //validate required fields.
    if(!title || !description)
    {
      return res.status(400).json({message : "Title and description are required"});
    }

    //creating ticket in database with title,description,category,priority and createdBy 
    // userId from req.user.
    const ticket = await Ticket.create({title, description,category, priority, 
      createdBy : req.user.userId});

    //out ticket only stores createdBy : ObjectId but populate() send us createdBy name,email role.
    const populatedTicket = await ticket.populate("createdBy","name email role");

    res.status(201).json({message : "Ticket created Successfully",ticket : populatedTicket});
  }

  catch(error)
  {
    res.status(500).json({message : "Faild to create ticket",error : error.message});
  }
};

//Read ticket GET/api/tickets
export const getTickets = async (req,res) =>
{
  try
  {
    //this allows requests like /api/tickets?status=open query parameter
    const {search, category, priority, status} = req.query;

    //create filter. initially no filter
    const filter = {};

    //normal user get only their tickets and admin got all tickets bcz we don't add createBy 
    // to the filter for admins.
    if(req.user.role !== "admin")
    {
      //if role is not admin means it's user then only show thier ticket 
      filter.createdBy = req.user.userId;
    }

    //SEARCH FILTER
    //if user search something mongoDB should check either title or description
    if(search)
    {
      // $regex:search means search for mathing text i = case insensitive.
      //ex. payment, Payment, payMent, PAYMENT all can match.
      filter.$or = [
        {title : {$regex : search, $options : "i"}},
        {description : {$regex : search, $options : "i"}}
      ];
    }

    //STATUS FILTER ex. /api/tickets?status=open so only open status tickets come 
    if(status)
    {
      filter.status = status;
    }

    //CATEGORY FILTER only search related category will come
    if(category)
    {
      filter.category = category;
    }

    //PRIORITY FILTER only searhc related priority will come
    if(priority)
    {
      filter.priority = priority;
    }

    //fetch tickets. //mongoDB will search according to out filter then add user info by populate 
    // then sort by the newsest
    const tickets = await Ticket.find(filter).populate("createdBy", "name email role").
    sort({createdAt : -1});

    res.status(200).json({count : tickets.length, tickets});
  }

  catch(error)
  {
    res.status(500).json({message : "Failed to fetch",error : error.message});
  }
};

//get single ticket. this handles GET /api/tickets/:id
export const getTicketById = async (req,res) =>
{
  try
  {
    //geting id
    const ticket = await Ticket.findById(req.params.id).populate("createdBy","name email role");

    //if id is not there
    if(!ticket)
    {
      return res.status(404).json({message : "Ticket not found"});
    }

    //owenership check if user is not admin and id deesn't match access denied it prevents user to view another user's tickets.
    if(req.user.role !== "admin" && ticket.createdBy._id.toString() !== req.user.userId)
    {
      return res.status(403).json({message : "You can only view your own tickets"});
    }

    res.status(200).json({ticket});
  }

  catch(error)
  {
    res.status(500).json({message : "Failed to fetch ticket",error : error.message});
  }
};

//Update ticket this handles PUT /api/tickets/:id
export const updateTicket = async (req,res) =>
{
  try
  {
    //get data from frontend.
    const {title, description, category, priority, status} = req.body;

    //get the ticket
    const ticket = await Ticket.findById(req.params.id);

    //if ticket is not there
    if(!ticket)
    {
      return res.status(404).json({message : "Ticket not found"});
    }

    //checking owenership if user is not admin & id doesn't match access denied this will prevents user to update another user ticket update
    if(req.user.role !== "admin" && ticket.createdBy.toString() !== req.user.userId)
    {
      return res.status(403).json({message : "You can only update your own tickets"});
    }

    //updating only the files that were actully provided.if user want to update only one 
    // field then rest of the fields value stay same

    //if user want to update title then only title field will change it's prevents accidentally 
    // overwite an existing value.
    //if title is not undefined means it's defined means user want to change the value 
    //and so on with all.
    if(title !== undefined)
    {
      ticket.title = title;
    }

    if(description !== undefined)
    {
      ticket.description = description;
    }

    if(category !== undefined)
    {
      ticket.category = category;
    }

    if(priority !== undefined)
    {
      ticket.priority = priority;
    }

    if(status !== undefined)
    {
      ticket.status = status;
    }

    //saving updates. //Mongoose sends the updated document to MongoDB.
    await ticket.save();
    const populatedTicket = await ticket.populate(
      "createdBy",
      "name email role"
    );
    res.status(200).json({message : "Ticket updated successfully",ticket : populatedTicket});
  }

  catch(error)
  {
    res.status(500).json({message : "Failed to update ticeket",error : error.message});
  }
};

//Delete ticket. this handles DELETE /api/tickets/:id
export const deleteTicket = async (req,res) =>
{
  try
  {
    //finding ticket
    const ticket = await Ticket.findById(req.params.id);

    //if ticket is not there
    if(!ticket)
    {
      return res.status(404).json({message : "Ticket not found"});
    }

    //checking owenership if user is not admin and user id not matched access will denied this prevents user to delete another user ticket.
    if(req.user.role !== "admin" && ticket.createdBy.toString() !== req.user.userId)
    {
      return res.status(403).json({message : "You can only delete your own tickets"});
    }

    //removes ticket.
    await ticket.deleteOne();
    res.status(200).json({message : "Ticket deleted successfully"});
  }

  catch(error)
  {
    res.status(500).json({message : "Faild to deleted ticket", error : error.message});
  }
};