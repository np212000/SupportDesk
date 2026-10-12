import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title : {type : String, required : true, trim : true, maxlength : 100},
    description : {type : String, required : true, trim : true},
    category : {type : String, enum : ["technical", "payment",  "account","general"], 
      default : "general"},
    priority : {type : String, enum : ["low", "medium", "high"], default : "medium"},
    status : {type : String, enum : ["open", "in-progress", "resolved","closed"], default : "open"},
    createdBy : {type : mongoose.Schema.Types.ObjectId, ref : "User", required : true}
  },
  {timestamps : true}
);

const Ticket = mongoose.model("Ticket",ticketSchema);

export default Ticket;