// src/ticket/ticket.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import { CreateTicketDTO } from './create-ticket.dto'; // Add this import

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> { // Change the type here
    const newTicket = new this.ticketModel(ticket);
    return newTicket.save();
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketModel.find().exec();
  }

  async findOne(id: string): Promise<Ticket> {
    return this.ticketModel.findById(id).exec();
  }

  // async findOneByEmail(email: string): Promise<Ticket> {
  //   return await this.ticketModel.findOne({ email }).exec();
  // }

  async update(id: string, ticket: Ticket): Promise<Ticket> { // Change the type here
    return this.ticketModel.findByIdAndUpdate(id, ticket, { new: true }).exec();
  }

  async delete(id: string): Promise<Ticket> {
    return this.ticketModel.findByIdAndDelete(id).exec();
  }
}
