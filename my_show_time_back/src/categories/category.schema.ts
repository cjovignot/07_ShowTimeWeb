import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @ApiProperty({ description: 'The name of the category', required: true })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ description: 'The number of concerts in the category', default: '0' })
  @Prop({ default: '0' })
  count_concert: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
