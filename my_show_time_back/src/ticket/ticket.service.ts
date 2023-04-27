// src/ticket/ticket.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from './ticket.schema';
import * as QRCode from 'qrcode'; // Import the QRCode library


@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> { // Change the type here
     // Generate the QR code data URL
     const qrCodeDataUrl = await QRCode.toDataURL(`/unit_concert?id=${ticket.id_concert}`);

     // Add the QR code data URL to the ticket object
     const ticketWithQrCode = {
       ...ticket,
       qrCodeDataUrl,
     };



     const newTicket = new this.ticketModel(ticketWithQrCode);
     return newTicket.save();
  }

  async findAll(query: any): Promise<Ticket[]> {
    return this.ticketModel.find(query).exec();
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
