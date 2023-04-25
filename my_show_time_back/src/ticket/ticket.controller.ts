// src/ticket/ticket.controller.ts

import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.schema';
import { CreateTicketDTO } from './create-ticket.dto'; // Add this import

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  create(@Body() ticket: Ticket): Promise<Ticket> { // Change the type here
    return this.ticketService.create(ticket);
  }

 
  @Get()
  findAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() ticket: Ticket): Promise<Ticket> { // Change the type here
    return this.ticketService.update(id, ticket);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.delete(id);
  }
}
