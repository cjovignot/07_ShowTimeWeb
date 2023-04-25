import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
  @Prop({ default: false })
  isArchived: boolean;

  @Prop({ default: null })
  name: string;

  @Prop({ default: null })
  artist_name: string;

  @Prop({ default: null })
  category_id: number;

  @Prop({ default: null })
  location: string;

  @Prop({ default: null })
  concert_date: Date;

  @Prop({ default: null })
  price: number;

  @Prop({ default: null })
  place_nbr: number;

  @Prop({ default: null })
  concert_img: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
