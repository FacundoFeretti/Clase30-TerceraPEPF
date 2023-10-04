import ticketDAO from "../daos/mongodb/TicketMongoDao.js";
import { getProductByIdService } from "./productsService.js";

const DaoTicket = new ticketDAO;

export const createTicketService = async (ticketInfo) => {
    const result = await DaoTicket.createTicket(ticketInfo);
    return result
}