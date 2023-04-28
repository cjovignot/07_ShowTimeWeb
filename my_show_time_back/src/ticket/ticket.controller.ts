import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.schema';
import { ApiTags, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Create a ticket', type: Ticket })
  create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketService.create(ticket);
  }

  @Get()
  @ApiQuery({ name: 'query', required: false, description: 'Search query for tickets' })
  @ApiResponse({ status: 200, description: 'List of tickets', type: [Ticket] })
  findAll(@Query() query: any): Promise<Ticket[]> {
    return this.ticketService.findAll(query);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiResponse({ status: 200, description: 'Ticket details', type: Ticket })
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiResponse({ status: 200, description: 'Update a ticket', type: Ticket })
  async update(@Param('id') id: string, @Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketService.update(id, ticket);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Ticket ID' })
  @ApiResponse({ status: 200, description: 'Delete a ticket', type: Ticket })
  async delete(@Param('id') id: string): Promise<Ticket> {
    return this.ticketService.delete(id);
  }
}
