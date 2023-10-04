import mongoose from 'mongoose';
import {ticketModel} from './models/ticket.model.js';
import config from '../../config.js';

export default class ticketDAO {
    connection = mongoose.connect(config.MONGO_URL)

    async createTicket(ticketInfo) {
        try {
            const result = await ticketModel.create(ticketInfo);
            return result;
        } catch (error) {
            throw new Error(`We couldn't create the ticket ${error.message}`);
        }
    };
}