// src/user/user.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {

  @Prop({ required: true })
  id_user: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  id_concert: string;

  @Prop({ required: true })
  concertName: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  price: Number;

  @Prop()
  qrCodeDataUrl: string; 
}


export const TicketSchema = SchemaFactory.createForClass(Ticket);