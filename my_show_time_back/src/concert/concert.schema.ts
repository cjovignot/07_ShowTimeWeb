import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type ConcertDocument = Concert & Document;

@Schema()
export class Concert {
  @ApiProperty({ description: 'Indicates if the concert is archived', default: false })
  @Prop({ default: false })
  isArchived: boolean;

  @ApiProperty({ description: 'The name of the concert', default: null })
  @Prop({ default: null })
  name: string;

  @ApiProperty({ description: 'The name of the artist', default: null })
  @Prop({ default: null })
  artist_name: string;

  @ApiProperty({ description: 'The category ID', default: null })
  @Prop({ default: null })
  category_id: string;

  @ApiProperty({ description: 'The concert location', default: null })
  @Prop({ default: null })
  location: string;

  @ApiProperty({ description: 'The date of the concert', default: null })
  @Prop({ default: null })
  concert_date: string;

  @ApiProperty({ description: 'The price of the concert', default: null })
  @Prop({ default: null })
  price: number;

  @ApiProperty({ description: 'The number of places available for the concert', default: null })
  @Prop({ default: null })
  place_nbr: number;

  @ApiProperty({ description: 'The image of the concert', default: null })
  @Prop({ default: null })
  concert_img: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
