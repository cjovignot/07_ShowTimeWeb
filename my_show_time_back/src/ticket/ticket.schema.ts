// Ticket schema
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @ApiProperty({ description: 'User ID', required: true })
  @Prop({ required: true })
  id_user: string;

  @ApiProperty({ description: 'First name', required: true })
  @Prop({ required: true })
  firstname: string;

  @ApiProperty({ description: 'Last name', required: true })
  @Prop({ required: true })
  lastname: string;

  @ApiProperty({ description: 'Concert ID', required: true })
  @Prop({ required: true })
  id_concert: string;

  @ApiProperty({ description: 'Concert name', required: true })
  @Prop({ required: true })
  concertName: string;

  @ApiProperty({ description: 'Date', required: true })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ description: 'Location', required: true })
  @Prop({ required: true })
  location: string;

  @ApiProperty({ description: 'Price', required: true })
  @Prop({ required: true })
  price: Number;

  @ApiProperty({ description: 'QR Code data URL', required: false })
  @Prop()
  qrCodeDataUrl: string;
; 
}


export const TicketSchema = SchemaFactory.createForClass(Ticket);