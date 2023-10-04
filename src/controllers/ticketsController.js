import mongoose from "mongoose";
import { createTicketService } from "../services/ticketService.js";

export const createTicketController = async () =>{
    const result = await createTicketService();
    return result;
};