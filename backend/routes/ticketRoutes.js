import express from "express";

import {createTicket, getTickets, getTicketById, updateTicket, deleteTicket} 
from "../controllers/ticketController.js";

import {protect, addmitOnly} from "../middleware/authMiddleware.js";

const router = express.Router();

// /api/tickets -> protect -> anyroutes 
//so the request must first pass JWT authentication.
router.post("/",protect, createTicket);
router.get("/",protect, getTickets);
router.get("/:id",protect, getTicketById);
router.put("/:id",protect, updateTicket);
router.delete("/:id",protect, deleteTicket);

//admin Route /api/tickets -> protect -> addmin only -> update ticket
router.patch("/:id/status", protect, addmitOnly, updateTicket);

export default router;